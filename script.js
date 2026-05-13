// ============================================================
// Waitlist form
// ============================================================
// Paste your waitlist key from waitlister.me dashboard → Overview.
// IMPORTANT: also whitelist `getstockr.co.uk` (and `www.getstockr.co.uk`) in
// Waitlister → Settings → Domains, or submissions will be rejected.
const WAITLIST_KEY = "FckiLOJoD9HS";

(function initWaitlistForm() {
  const form = document.getElementById("waitlist-form");
  const success = document.getElementById("waitlist-success");
  if (!form || !success) return;

  const submit = form.querySelector(".form-submit");
  const label = form.querySelector(".form-submit-label");
  const spinner = form.querySelector(".form-submit-spinner");
  const errEl = form.querySelector(".form-error");
  const emailInput = form.querySelector('input[name="email"]');

  const showError = (msg) => {
    errEl.textContent = msg;
    errEl.hidden = false;
  };
  const hideError = () => {
    errEl.hidden = true;
    errEl.textContent = "";
  };
  const setLoading = (on) => {
    submit.disabled = on;
    spinner.hidden = !on;
    label.textContent = on ? "Joining…" : "Join the waitlist";
    Array.from(form.querySelectorAll(".form-input")).forEach((i) => (i.disabled = on));
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    if (!emailInput.value || !emailInput.checkValidity()) {
      showError("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    if (!WAITLIST_KEY || WAITLIST_KEY === "YOUR-WAITLIST-KEY") {
      showError("Waitlist isn't configured yet. Email hello@getstockr.co.uk and we'll add you manually.");
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    for (const k in data) {
      data[k] = (data[k] || "").toString().trim();
      if (!data[k]) delete data[k];
    }

    setLoading(true);
    try {
      const res = await fetch(`https://waitlister.me/s/${WAITLIST_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        const msg =
          json.message ||
          (res.status === 429
            ? "Too many tries — please try again in a minute."
            : `Something went wrong (status ${res.status}). Please try again.`);
        showError(msg);
        return;
      }

      form.hidden = true;
      success.hidden = false;

      const posEl = success.querySelector(".success-position");
      const sLine = success.querySelector(".success-line");
      const sH = success.querySelector(".success-h");

      if (json.is_pending_confirmation) {
        sH.textContent = "Check your inbox.";
        sLine.innerHTML = json.message || "We sent a confirmation link to verify your email.";
      } else if (json.position && posEl) {
        posEl.textContent = String(json.position);
      } else if (sLine) {
        sLine.innerHTML = "We'll email when Stockr opens.";
      }

      if (json.referral_code) {
        const ref = success.querySelector(".referral");
        const refInput = success.querySelector(".referral-link");
        if (ref && refInput) {
          refInput.value = `https://getstockr.co.uk/?ref=${encodeURIComponent(json.referral_code)}`;
          ref.hidden = false;
        }
      }

      success.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      showError("Connection failed. Please try again, or email hello@getstockr.co.uk.");
    } finally {
      setLoading(false);
    }
  });

  // Copy referral link
  const copyBtn = success.querySelector(".referral-copy");
  copyBtn?.addEventListener("click", async () => {
    const input = success.querySelector(".referral-link");
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input.value);
    } catch {
      input.select();
      document.execCommand("copy");
    }
    const original = copyBtn.textContent;
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = original;
    }, 1800);
  });
})();

// Keep footer year current.
document.getElementById("year").textContent = String(new Date().getFullYear());

// Sticky nav subtle shadow when scrolled.
const nav = document.querySelector(".nav");
const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 8) nav.classList.add("nav-scrolled");
  else nav.classList.remove("nav-scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Make any FAQ <details> close its siblings when one opens (single-open accordion).
document.querySelectorAll(".faq details").forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) {
      document.querySelectorAll(".faq details").forEach((other) => {
        if (other !== d) other.open = false;
      });
    }
  });
});
