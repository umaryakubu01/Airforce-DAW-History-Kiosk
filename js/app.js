(function () {
  "use strict";
  const $ = (s, p = document) => p.querySelector(s),
    $$ = (s, p = document) => Array.from(p.querySelectorAll(s));
  const page = location.pathname.split("/").pop() || "index.html";
  const go = (p, params = "") => {
    location.href = p + ".html" + params;
  };
  const nav = ["index", "eras", "timeline", "films", "memorabilia"];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  function reveal(el, delay = 0, fade = false) {
    if (!el || reducedMotion.matches) return;
    el.style.setProperty("--reveal-delay", delay + "ms");
    el.classList.toggle("fade-only", fade);
    el.classList.add("museum-reveal");
  }
  function refreshFade(el) {
    if (!el || reducedMotion.matches) return;
    el.classList.remove("content-refresh");
    cancelAnimationFrame(el.fadeFrame);
    el.fadeFrame = requestAnimationFrame(() => {
      el.fadeFrame = requestAnimationFrame(() =>
        el.classList.add("content-refresh"),
      );
    });
  }
  function filterCard(card, visible) {
    clearTimeout(card.hideTimer);
    card.classList.remove("filter-leaving");
    if (visible) {
      card.style.display = "";
      card.inert = false;
      refreshFade(card);
    } else if (reducedMotion.matches) {
      card.style.display = "none";
      card.inert = true;
    } else {
      card.inert = true;
      card.classList.add("filter-leaving");
      card.hideTimer = setTimeout(() => {
        card.style.display = "none";
        card.classList.remove("filter-leaving");
      }, 140);
    }
  }
  if (page !== "index.html")
    Array.from(document.body.children)
      .filter((el) => !el.matches(".top,script"))
      .forEach((el) => reveal(el, 0, true));

  function showPhoto(slot, key) {
    if (!slot) return;
    if (!slot.originalContent)
      slot.originalContent = Array.from(slot.childNodes);
    slot.replaceChildren(...slot.originalContent);
    slot.classList.remove("has-photo");
    const photo = DAW_PHOTOS[key];
    if (!photo) return;
    const img = document.createElement("img"),
      caption = document.createElement("span");
    img.alt = photo.caption;
    img.decoding = "async";
    caption.className = "photo-caption";
    caption.textContent = photo.caption;
    img.onerror = () => {
      if (slot.contains(img)) {
        slot.replaceChildren(...slot.originalContent);
        slot.classList.remove("has-photo");
      }
    };
    slot.classList.add("has-photo");
    slot.replaceChildren(img, caption);
    img.src = photo.src;
  }
  function fit() {
    document.documentElement.style.setProperty(
      "--screen-scale",
      Math.min(innerWidth / 1920, innerHeight / 1080),
    );
  }
  window.addEventListener("resize", fit);
  fit();
  $$(".steps .st").forEach((el, i) => {
    el.setAttribute("role", "button");
    el.tabIndex = 0;
    el.addEventListener("click", () => go(nav[i]));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go(nav[i]);
      }
    });
  });
  $$("button.home").forEach((el) =>
    el.addEventListener("click", () => go("index")),
  );
  function btn(text, cb) {
    const b = $$("button").find((x) =>
      x.textContent.trim().replace(/\s+/g, " ").includes(text),
    );
    if (b) b.addEventListener("click", cb);
  }
  // Dialogs close with a short fade, release their handlers, and restore focus.
  function dialog(wrap, onClose = () => {}) {
    const opener = document.activeElement,
      siblings = Array.from(document.body.children).filter((el) => el !== wrap);
    const previousInert = siblings.map((el) => el.inert);
    siblings.forEach((el) => (el.inert = true));
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    let closing = false,
      timer;
    const dispose = () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", key);
      onClose();
      wrap.remove();
      siblings.forEach((el, i) => (el.inert = previousInert[i]));
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
    const close = () => {
      if (closing) return;
      closing = true;
      onClose();
      wrap.classList.add("is-closing");
      timer = setTimeout(dispose, reducedMotion.matches ? 0 : 180);
    };
    const key = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab") {
        const controls = $$(
            'button:not(:disabled),input:not(:disabled),[tabindex="0"]',
            wrap,
          ),
          first = controls[0],
          last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    wrap.dispose = dispose;
    $("button", wrap)?.focus({ preventScroll: true });
    return close;
  }
  function player(index = 0, ambient = false) {
    index = Math.max(0, Math.min(DAW_FILMS.length - 1, index));
    $("#daw-player")?.dispose();
    const item = DAW_FILMS[index],
      wrap = document.createElement("div");
    wrap.id = "daw-player";
    wrap.setAttribute("aria-label", item.title);
    wrap.innerHTML = `<video playsinline preload="metadata" poster="assets/posters/${item.id}.jpg"></video><div class="player-top"><button id="close-film">‹ Films</button><div><span style="color:#d6b566;font-size:18px;letter-spacing:.12em">${item.sub}</span><div class="player-title">${item.title}</div></div><button id="player-home">⌂ Home</button></div><div class="player-bottom"><input id="seek" aria-label="Video progress" type="range" min="0" max="1000" value="0"><div class="player-time"><span id="elapsed">0:00</span><span id="duration">0:00</span></div><div class="player-actions"><button id="previous-film">◀ Previous film</button><button id="back10">↶ 10 s</button><button id="play-pause" class="primary">❚❚ Pause</button><button id="ahead10">10 s ↷</button><button id="mute-film">Sound on</button><button id="next-film">Next film ▶</button></div></div>`;
    document.body.append(wrap);
    const q = (s) => $(s, wrap),
      v = q("video");
    v.src = "assets/videos/" + item.id + ".mp4";
    v.muted = !!ambient;
    const close = dialog(wrap, () => v.pause());
    const fmt = (n) => {
      n = Math.max(0, Math.floor(n || 0));
      return Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0");
    };
    const sync = () => {
      const ready = Number.isFinite(v.duration) && v.duration > 0;
      q("#elapsed").textContent = fmt(v.currentTime);
      q("#duration").textContent = fmt(v.duration);
      q("#seek").value = ready
        ? Math.round((v.currentTime / v.duration) * 1000)
        : 0;
      ["#seek", "#back10", "#ahead10"].forEach((s) => (q(s).disabled = !ready));
      q("#play-pause").textContent = v.paused ? "▶ Play" : "❚❚ Pause";
      q("#play-pause").setAttribute("aria-pressed", String(!v.paused));
      q("#mute-film").textContent = v.muted ? "Sound off" : "Sound on";
      q("#mute-film").setAttribute("aria-pressed", String(!v.muted));
    };
    const play = () => v.play().catch(sync);
    [
      "timeupdate",
      "loadedmetadata",
      "ended",
      "play",
      "pause",
      "volumechange",
    ].forEach((event) => v.addEventListener(event, sync));
    q("#seek").oninput = (e) => {
      if (Number.isFinite(v.duration))
        v.currentTime = (e.target.value / 1000) * v.duration;
    };
    q("#play-pause").onclick = () => (v.paused ? play() : v.pause());
    q("#back10").onclick = () =>
      (v.currentTime = Math.max(0, v.currentTime - 10));
    q("#ahead10").onclick = () =>
      (v.currentTime = Math.min(v.duration || 0, v.currentTime + 10));
    q("#mute-film").onclick = () => {
      v.muted = !v.muted;
      sync();
    };
    q("#close-film").onclick = close;
    q("#player-home").onclick = () => go("index");
    q("#previous-film").onclick = () =>
      player((index + DAW_FILMS.length - 1) % DAW_FILMS.length);
    q("#next-film").onclick = () => player((index + 1) % DAW_FILMS.length);
    sync();
    play();
  }
  if (page === "index.html") {
    const video = $("#ambient-video");
    if (video) {
      const silence = () => {
        video.defaultMuted = true;
        video.muted = true;
        if (video.volume !== 0) video.volume = 0;
      };
      const playSilently = () => {
        silence();
        if (!video.error) video.play().catch(() => {});
      };
      video.controls = false;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.addEventListener("volumechange", silence);
      video.addEventListener("error", () =>
        $("#welcome-backdrop").classList.add("video-unavailable"),
      );
      $("source", video)?.addEventListener("error", () =>
        $("#welcome-backdrop").classList.add("video-unavailable"),
      );
      video.addEventListener("playing", () =>
        $("#welcome-backdrop").classList.remove("video-unavailable"),
      );
      // A rejected autoplay is retried on interaction; no handler enables sound.
      const retry = () => {
        if (video.paused) playSilently();
      };
      document.addEventListener("pointerdown", retry, { passive: true });
      document.addEventListener("keydown", retry);
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) retry();
      });
      window.addEventListener("pageshow", retry);
      playSilently();
    }
    const content = $(".welcome-content");
    [
      $(".eb", content),
      $("h1", content),
      $("p", content),
      $("button", content)?.parentElement,
      ...$$(".welcome-statistics .gl"),
    ].forEach((el, i) => reveal(el, i * 100));
    btn("Begin the journey", () => go("eras"));
    btn("Watch the introduction", () => player(0, false));
  }
  if (page === "timeline-no-photo.html") {
    let active = Math.max(
      0,
      Math.min(
        9,
        parseInt(new URLSearchParams(location.search).get("m") || "0", 10) || 0,
      ),
    );
    let eraFilter = null,
      catFilter = "All";
    const groups = $$(
      'body > div[style*="display:flex;justify-content:space-between;align-items:center;padding:20px"] .chip',
    );
    const chips = groups.length ? groups : $$(".chip");
    const eraChips = chips.slice(0, 4),
      catChips = chips.slice(4, 8);
    const main = $$("body > div").find(
      (el) => el.style.display === "flex" && el.style.gap === "40px",
    );
    const left = main?.children[0];
    const right = main?.children[1];
    const rows = left
      ? $$("div", left).filter((el) => el.style.height === "70px")
      : [];
    const placeholder = $(".ph", right),
      tags = $$(".tag", right),
      date = $(".eb", right),
      title = $("h1", right),
      desc = $("p", right);
    let previousActive = -1;
    rows.forEach((row) => row.classList.add("milestone-row"));
    function render() {
      if (previousActive !== active) {
        refreshFade(right);
        previousActive = active;
      }
      const m = DAW_MILESTONES[active];
      rows.forEach((r, i) => {
        let show =
          (eraFilter === null || DAW_MILESTONES[i].era === eraFilter) &&
          (catFilter === "All" || DAW_MILESTONES[i].category === catFilter);
        r.style.display = show ? "flex" : "none";
        r.setAttribute("aria-pressed", String(i === active));
        r.style.background =
          i === active
            ? "linear-gradient(90deg,rgba(214,181,102,.2),rgba(214,181,102,.04))"
            : "transparent";
        r.style.borderLeftColor = i === active ? "var(--br)" : "transparent";
        r.children[0].style.color = i === active ? "var(--br)" : "#9FB0C4";
        r.children[1].style.color = i === active ? "#fff" : "#B5C2D1";
        r.children[1].style.fontWeight = i === active ? "600" : "400";
      });
      if (placeholder) {
        showPhoto(placeholder, m.photo);
        placeholder.style.display = "flex";
        let note = $("i", placeholder);
        if (note)
          note.textContent =
            "Photo for “" + m.title + "” · to be supplied by DAW";
      }
      if (tags[0]) {
        let icon = $("svg", tags[0]);
        tags[0].textContent = m.category + " ";
        if (icon) tags[0].prepend(icon);
      }
      if (tags[1])
        tags[1].textContent =
          ["Foundation", "Move to Jaji", "Growth", "Today"][m.era] + " era";
      if (date) date.textContent = m.date;
      if (title) title.textContent = m.title;
      if (desc) desc.textContent = m.description;
      let progress = $('.foot div[style*="letter-spacing"]');
      if (progress)
        progress.textContent = "MILESTONE " + (active + 1) + " / 10";
      let bars = $$('.foot div[style*="justify-content:center"] span');
      bars.forEach((x, i) => {
        x.style.background =
          i === active
            ? "var(--br)"
            : i < active
              ? "rgba(214,181,102,.55)"
              : "rgba(255,255,255,.18)";
        x.style.width = i === active ? "48px" : "20px";
      });
      eraChips.forEach((x, i) => x.classList.toggle("on", i === m.era));
      catChips.forEach((x, i) =>
        x.classList.toggle(
          "on",
          ["All", "Formation", "Facilities", "Curriculum"][i] === catFilter,
        ),
      );
      history.replaceState(null, "", "?m=" + active);
    }
    rows.forEach((r, i) => {
      r.tabIndex = 0;
      r.setAttribute("role", "button");
      r.onclick = () => {
        active = i;
        render();
      };
      r.onkeydown = (e) => {
        if (e.key === "Enter") {
          active = i;
          render();
        }
      };
    });
    eraChips.forEach((c, i) => {
      c.tabIndex = 0;
      c.setAttribute("role", "button");
      c.onclick = () => {
        eraFilter = eraFilter === i ? null : i;
        let next = DAW_MILESTONES.findIndex(
          (m, j) =>
            (eraFilter === null || m.era === eraFilter) &&
            (catFilter === "All" || m.category === catFilter),
        );
        if (next >= 0) active = next;
        render();
      };
    });
    catChips.forEach((c, i) => {
      c.tabIndex = 0;
      c.setAttribute("role", "button");
      c.onclick = () => {
        catFilter = ["All", "Formation", "Facilities", "Curriculum"][i];
        let next = DAW_MILESTONES.findIndex(
          (m) =>
            (eraFilter === null || m.era === eraFilter) &&
            (catFilter === "All" || m.category === catFilter),
        );
        if (next < 0) {
          eraFilter = null;
          next = DAW_MILESTONES.findIndex(
            (m) => catFilter === "All" || m.category === catFilter,
          );
        }
        if (next >= 0) active = next;
        render();
      };
    });
    btn("Previous", () => {
      active = (active + 9) % 10;
      eraFilter = null;
      catFilter = "All";
      render();
    });
    btn("Next", () => {
      active = (active + 1) % 10;
      eraFilter = null;
      catFilter = "All";
      render();
    });
    render();
  }
  if (page === "overview.html") {
    const label = (el) => el.textContent.trim().replace(/\s+/g, " ");
    const cards = $$(".gl").filter((el) =>
      DAW_MILESTONES.some((m) => label(el) === m.year + " " + m.title),
    );
    cards.forEach((el) => {
      const i = DAW_MILESTONES.findIndex(
        (m) => label(el) === m.year + " " + m.title,
      );
      el.tabIndex = 0;
      el.setAttribute("role", "button");
      el.classList.add("interactive-card");
      el.style.cursor = "pointer";
      el.onclick = () => go("timeline-no-photo", "?m=" + i);
    });
    btn("Open timeline", () => go("timeline-no-photo"));
    btn("Eras", () => go("eras"));
  }
  if (page === "memorabilia.html") {
    btn("Back to timeline", () => go("timeline"));
    const cards = $$("body .gl").filter((el) => el.querySelector(".ph"));
    const filters = $$(".chip"),
      categories = ["All", "Ceremonies", "Courses", "Campus"];
    $("h1").textContent = "Photographs from the archives";
    filters.forEach((c, i) => {
      c.textContent = categories[i];
      c.tabIndex = 0;
      c.setAttribute("role", "button");
      c.onclick = () => {
        filters.forEach((x) => x.classList.remove("on"));
        c.classList.add("on");
        cards.forEach((card, j) => {
          filterCard(
            card,
            i === 0 || DAW_ARCHIVES[j].category === categories[i],
          );
        });
      };
      c.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          c.click();
        }
      };
    });
    cards.forEach((card, i) => {
      const item = DAW_ARCHIVES[i],
        heading = $(".serif", card);
      card.classList.add("interactive-card");
      reveal(card, i * 70);
      showPhoto($(".ph", card), item.photo);
      heading.textContent = item.title;
      heading.nextElementSibling.textContent =
        item.category + " · College photographic archive";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "View " + item.title);
      card.style.cursor = "pointer";
      card.onclick = () => {
        const modal = document.createElement("div");
        modal.id = "daw-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", item.title);
        modal.innerHTML =
          '<div><button aria-label="Close">Close ×</button><h2></h2><div class="ph" style="height:540px"><b>Image unavailable</b></div></div>';
        $("h2", modal).textContent = item.title;
        showPhoto($(".ph", modal), item.photo);
        document.body.append(modal);
        const close = dialog(modal);
        $("button", modal).onclick = close;
        modal.onclick = (e) => {
          if (e.target === modal) close();
        };
        $("button", modal).focus({ preventScroll: true });
      };
      card.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      };
    });
  }
  if (page === "films.html" || page === "films-coming-soon.html") {
    const filmCards = $$('div[style*="background:url(assets/posters/"]');
    filmCards.forEach((card) =>
      card.classList.add("interactive-card", "film-card"),
    );
    // Match film cards using their visible title and the original fixed card structure.
    $$("body *")
      .filter(
        (el) =>
          el.children.length === 0 &&
          DAW_FILMS.some((f) => el.textContent.trim() === f.title),
      )
      .forEach((el) => {
        const i = DAW_FILMS.findIndex((f) => el.textContent.trim() === f.title);
        let card = el.closest('[style*="border-radius"]') || el.parentElement;
        card.style.cursor = "pointer";
        card.classList.add("interactive-card", "film-card");
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", "Play " + DAW_FILMS[i].title);
        card.onclick = () => player(i, false);
      });
    // The featured card handles its nested Play button through normal bubbling.
    if (!$(".film-card button")) btn("Play film", () => player(0, false));
    btn("Timeline", () => go("timeline"));
    btn("Archives", () => go("memorabilia"));
  }
  // Shared keyboard activation also covers timeline filters and overview cards.
  $$("[role=button]")
    .filter((el) => !el.closest(".steps"))
    .forEach((el) => {
      el.onkeydown = (e) => {
        if (e.target === el && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          el.click();
        }
      };
    });
})();
