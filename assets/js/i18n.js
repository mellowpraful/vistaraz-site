/*
 * MANNMITRA — i18n (EN / HI / MR)
 * No backend. Strings live here; UI reads via MANNMITRA.i18n.t(key).
 */
(function (global) {
  "use strict";

  const STR = {
    en: {
      "nav.home": "Home", "nav.checkin": "Check-in", "nav.peer": "Peer",
      "nav.counselor": "Counselor", "nav.resources": "Resources", "nav.privacy": "Privacy",
      "nav.dashboard": "Dashboard", "nav.journal": "Journal", "nav.breathing": "Breathe",
      "nav.admin": "Admin", "nav.counselorDash": "Counselor",
      "start": "Start anonymously", "howProtect": "How we protect you",
      "hero.title1": "The first step to feeling better", "hero.title2": "shouldn't feel heavy.",
      "hero.sub": "MANNMITRA is a trust-first mental health companion for students. Start with a 2-minute anonymous check-in — no login, no confession to a stranger on day one.",
      "trustFunnel": "The trust funnel", "trustSub": "We lower the first step, then route you to the right kind of help.",
      "whyWins": "Why this wins", "tryCheckin": "Try the 2-minute check-in",
      "checkin.title": "2-minute check-in", "checkin.sub": "No login. Your answer stays on this device.",
      "mood.q": "How are you feeling right now?", "sleep.q": "Have you been sleeping well lately?",
      "support.q": "Do you feel supported by people around you?", "mind.q": "Anything on your mind? (optional)",
      "seePath": "See my path", "recommended": "Recommended", "severity": "Severity",
      "peer.title": "Peer Support", "peer.sub": "Trained senior students. Anonymous. Someone like you.",
      "resources.title": "Resource Library", "resources.sub": "Published in Hindi, English and Marathi.",
      "privacy.title": "How we protect your privacy", "dashboard.title": "Your Progress",
      "journal.title": "Journal", "breathing.title": "Breathing Exercise",
      "admin.title": "Admin Panel", "counselor.title": "Counselor Dashboard",
      "crisis.line": "In crisis? 24x7 helplines", "lang": "Language"
    },
    hi: {
      "nav.home": "होम", "nav.checkin": "चेक-इन", "nav.peer": "साथी",
      "nav.counselor": "काउंसलर", "nav.resources": "संसाधन", "nav.privacy": "गोपनीयता",
      "nav.dashboard": "डैशबोर्ड", "nav.journal": "जर्नल", "nav.breathing": "श्वास",
      "nav.admin": "एडमिन", "nav.counselorDash": "काउंसलर",
      "start": "बिना पहचान के शुरू करें", "howProtect": "हम आपकी रक्षा कैसे करते हैं",
      "hero.title1": "बेहतर महसूस करने की पहली सीढ़ी", "hero.title2": "भारी नहीं होनी चाहिए।",
      "hero.sub": "MANNMITRA छात्रों के लिए विश्वास-प्रथम मानसिक स्वास्थ्य साथी है। 2 मिनट की गुमनाम चेक-इन से शुरू करें — कोई लॉगिन नहीं।",
      "trustFunnel": "विश्वास की सीढ़ी", "trustSub": "हम पहला कदम हल्का करते हैं, फिर सही मदद तक पहुँचाते हैं।",
      "whyWins": "यह क्यों जीतता है", "tryCheckin": "2-मिनट चेक-इन आज़माएँ",
      "checkin.title": "2-मिनट चेक-इन", "checkin.sub": "कोई लॉगिन नहीं। आपका उत्तर इसी उपकरण पर रहता है।",
      "mood.q": "अभी आप कैसा महसूस कर रहे हैं?", "sleep.q": "पिछले दिनों आपकी नींद ठीक रही?",
      "support.q": "क्या आपको आस-पास के लोगों का सहयोग मिलता है?", "mind.q": "कुछ मन में है? (वैकल्पिक)",
      "seePath": "मेरा रास्ता देखें", "recommended": "अनुशंसित", "severity": "गंभीरता",
      "peer.title": "साथी समर्थन", "peer.sub": "प्रशिक्षित वरिष्ठ छात्र। गुमनाम। आप जैसा कोई।",
      "resources.title": "संसाधन पुस्तकालय", "resources.sub": "हिन्दी, अंग्रेज़ी और मराठी में उपलब्ध।",
      "privacy.title": "हम आपकी गोपनीयता कैसे बचाते हैं", "dashboard.title": "आपकी प्रगति",
      "journal.title": "जर्नल", "breathing.title": "श्वास व्यायाम",
      "admin.title": "एडमिन पैनल", "counselor.title": "काउंसलर डैशबोर्ड",
      "crisis.line": "संकट में? 24x7 हेल्पलाइन", "lang": "भाषा"
    },
    mr: {
      "nav.home": "होम", "nav.checkin": "चेक-इन", "nav.peer": "सोबती",
      "nav.counselor": "काउंसेलर", "nav.resources": "संसाधने", "nav.privacy": "गोपनीयता",
      "nav.dashboard": "डॅशबोर्ड", "nav.journal": "जर्नल", "nav.breathing": "श्वास",
      "nav.admin": "अॅडमिन", "nav.counselorDash": "काउंसेलर",
      "start": "नाव न घेता सुरू करा", "howProtect": "आम्ही तुमचे संरक्षण कसे करतो",
      "hero.title1": "बरं वाटण्याची पहिली पायरी", "hero.title2": "अवघड असू नये.",
      "hero.sub": "MANNMITRA हा विद्यार्थ्यांसाठी विश्वासावर आधारित मानसिक आरोग्य साथीदार आहे. 2 मिनिटांच्या अनामिक चेक-इनने सुरुवात करा — कोणतेही लॉगिन नाही.",
      "trustFunnel": "विश्वासाची पायरी", "trustSub": "आम्ही पहिली पायरी हलकी करतो, मग योग्य मदतीपर्यंत पोहोचवतो.",
      "whyWins": "हे का जिंकते", "tryCheckin": "2-मिनिट चेक-इन वापरा",
      "checkin.title": "2-मिनिट चेक-इन", "checkin.sub": "कोणतेही लॉगिन नाही. तुमचे उत्तर या उपकरणावरच राहते.",
      "mood.q": "सध्या तुम्हाला कसे वाटत आहे?", "sleep.q": "गेल्या काही दिवसांत तुम्हाला चांगली झोप लागली?",
      "support.q": "तुम्हाला सभोवतालच्या लोकांचा आधार वाटतो का?", "mind.q": "मनात काहीतरी आहे? (पर्यायी)",
      "seePath": "माझा मार्ग पहा", "recommended": "शिफारस", "severity": "गांभीर्य",
      "peer.title": "सोबती समर्थन", "peer.sub": "प्रशिक्षित वरिष्ठ विद्यार्थी. अनामिक. तुमच्यासारखेच कोणीतरी.",
      "resources.title": "संसाधन विभाग", "resources.sub": "हिंदी, इंग्रजी आणि मराठीत उपलब्ध.",
      "privacy.title": "आम्ही तुमची गोपनीयता कशी जपतो", "dashboard.title": "तुमची प्रगती",
      "journal.title": "जर्नल", "breathing.title": "श्वास व्यायाम",
      "admin.title": "अॅडमिन पॅनेल", "counselor.title": "काउंसेलर डॅशबोर्ड",
      "crisis.line": "संकटात? 24x7 हेल्पलाइन", "lang": "भाषा"
    }
  };

  function getLang() {
    try { return localStorage.getItem("mannmitra_lang") || "en"; } catch (e) { return "en"; }
  }
  function setLang(l) { try { localStorage.setItem("mannmitra_lang", l); } catch (e) {} }
  function t(key) {
    const l = getLang();
    return (STR[l] && STR[l][key]) || (STR.en[key]) || key;
  }

  global.MANNMITRA = global.MANNMITRA || {};
  global.MANNMITRA.i18n = { t, getLang, setLang, langs: ["en", "hi", "mr"] };
})(window);
