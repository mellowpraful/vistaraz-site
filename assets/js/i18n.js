/*
 * Vistaraz — i18n (EN / HI / MR)
 * No backend. Strings live here; UI reads via Vistaraz.i18n.t(key).
 */
(function (global) {
  "use strict";

  const STR = {
    en: {
      "nav.home": "Home", "nav.checkin": "Daily pulse", "nav.peer": "Peer circle",
      "nav.counselor": "Counselor", "nav.resources": "Library", "nav.privacy": "Privacy",
      "nav.dashboard": "Progress", "nav.journal": "Reflection", "nav.breathing": "Reset",
      "nav.admin": "Campus admin", "nav.counselorDash": "Counselor hub",
      "start": "Start anonymously", "howProtect": "How privacy works",
      "hero.title1": "A student wellbeing system", "hero.title2": "for the moments before a crisis.",
      "hero.sub": "Vistaraz helps college students check in anonymously, get gentle AI reflection, and move toward the right human support without stigma or paperwork.",
      "trustFunnel": "How the ecosystem works", "trustSub": "Anonymous first, human before AI, and support that scales across peer circles and counselors.",
      "whyWins": "Why this feels safe", "tryCheckin": "Try the 30-second pulse",
      "checkin.title": "Daily pulse", "checkin.sub": "Anonymous, quick, and private to this device.",
      "mood.q": "How is your balance today?", "sleep.q": "How has your sleep been lately?",
      "support.q": "Do you feel supported by people around you?", "mind.q": "What is weighing on you? (optional)",
      "seePath": "See my path", "recommended": "Recommended", "severity": "Severity",
      "peer.title": "Peer circle", "peer.sub": "Trained senior students who listen without judging.",
      "resources.title": "Support library", "resources.sub": "Practical tools in Hindi, English, Marathi and Gujarati.",
      "privacy.title": "How we protect your privacy", "dashboard.title": "Progress dashboard",
      "journal.title": "Reflection journal", "breathing.title": "Grounding breath",
      "admin.title": "Campus analytics", "counselor.title": "Counselor dashboard",
      "crisis.line": "In crisis? 24x7 helplines", "lang": "Language"
    },
    hi: {
      "nav.home": "होम", "nav.checkin": "दैनिक पल्स", "nav.peer": "पीयर सर्कल",
      "nav.counselor": "काउंसलर", "nav.resources": "लाइब्रेरी", "nav.privacy": "गोपनीयता",
      "nav.dashboard": "प्रगति", "nav.journal": "प्रतिबिंब", "nav.breathing": "रीसेट",
      "nav.admin": "कैंपस एडमिन", "nav.counselorDash": "काउंसलर हब",
      "start": "बिना पहचान के शुरू करें", "howProtect": "गोपनीयता कैसे काम करती है",
      "hero.title1": "छात्रों के लिए वेलबीइंग सिस्टम", "hero.title2": "जो संकट से पहले साथ देता है।",
      "hero.sub": "Vistaraz छात्रों को अनाम चेक-इन, सौम्य AI प्रतिबिंब और सही मानवीय मदद तक बिना कलंक या झंझट के पहुंचने में मदद करता है।",
      "trustFunnel": "इकोसिस्टम कैसे काम करता है", "trustSub": "पहले अनामता, फिर मानव समर्थन, और उसके बाद AI — सब कुछ पीयर सर्कल और काउंसलर के साथ।",
      "whyWins": "यह सुरक्षित क्यों लगता है", "tryCheckin": "30-सेकंड पल्स आज़माएँ",
      "checkin.title": "दैनिक पल्स", "checkin.sub": "अनाम, तेज़, और सिर्फ़ इस डिवाइस पर निजी।",
      "mood.q": "आज आपका संतुलन कैसा है?", "sleep.q": "हाल में आपकी नींद कैसी रही?",
      "support.q": "क्या आपको आसपास के लोगों का समर्थन महसूस होता है?", "mind.q": "क्या बात आपको दबा रही है? (वैकल्पिक)",
      "seePath": "मेरा रास्ता देखें", "recommended": "अनुशंसित", "severity": "गंभीरता",
      "peer.title": "पीयर सर्कल", "peer.sub": "प्रशिक्षित वरिष्ठ छात्र जो बिना जज किए सुनते हैं।",
      "resources.title": "सहायता लाइब्रेरी", "resources.sub": "हिन्दी, अंग्रेज़ी, मराठी और गुजराती में व्यावहारिक उपकरण।",
      "privacy.title": "हम आपकी गोपनीयता कैसे बचाते हैं", "dashboard.title": "प्रगति डैशबोर्ड",
      "journal.title": "प्रतिबिंब जर्नल", "breathing.title": "ग्राउंडिंग श्वास",
      "admin.title": "कैंपस विश्लेषण", "counselor.title": "काउंसलर डैशबोर्ड",
      "crisis.line": "संकट में? 24x7 हेल्पलाइन", "lang": "भाषा"
    },
    mr: {
      "nav.home": "होम", "nav.checkin": "दैनिक पल्स", "nav.peer": "सोबती सर्कल",
      "nav.counselor": "काउंसेलर", "nav.resources": "संसाधने", "nav.privacy": "गोपनीयता",
      "nav.dashboard": "प्रगती", "nav.journal": "प्रतिबिंब", "nav.breathing": "रीसेट",
      "nav.admin": "अॅडमिन", "nav.counselorDash": "काउंसेलर हब",
      "start": "नाव न घेता सुरू करा", "howProtect": "गोपनीयता कशी काम करते",
      "hero.title1": "विद्यार्थ्यांसाठी वेलबीइंग सिस्टम", "hero.title2": "जी संकटापूर्वी साथ देते.",
      "hero.sub": "Vistaraz विद्यार्थ्यांना अनामिक चेक-इन, सौम्य AI प्रतिबिंब आणि योग्य मानवी मदतीकडे कलंकाशिवाय पोहोचण्यात मदत करते.",
      "trustFunnel": "इकोसिस्टम कशी काम करते", "trustSub": "प्रथम अनामिकता, मग मानवी समर्थन, आणि त्यानंतर AI — सर्व काही सोबती सर्कल आणि काउंसेलरसह.",
      "whyWins": "हे सुरक्षित का वाटते", "tryCheckin": "30-सेकंद पल्स वापरा",
      "checkin.title": "दैनिक पल्स", "checkin.sub": "अनामिक, जलद, आणि फक्त या उपकरणावर खाजगी.",
      "mood.q": "आज तुमचा समतोल कसा आहे?", "sleep.q": "अलीकडे झोप कशी लागते आहे?",
      "support.q": "तुम्हाला आजूबाजूच्या लोकांचा आधार वाटतो का?", "mind.q": "काय मनावर आहे? (पर्यायी)",
      "seePath": "माझा मार्ग पहा", "recommended": "शिफारस", "severity": "गांभीर्य",
      "peer.title": "सोबती सर्कल", "peer.sub": "प्रशिक्षित वरिष्ठ विद्यार्थी जे न जज करता ऐकतात.",
      "resources.title": "सहाय्य लायब्ररी", "resources.sub": "हिंदी, इंग्रजी, मराठी आणि गुजरातीमध्ये व्यावहारिक साधने.",
      "privacy.title": "आम्ही तुमची गोपनीयता कशी जपतो", "dashboard.title": "प्रगती डॅशबोर्ड",
      "journal.title": "प्रतिबिंब जर्नल", "breathing.title": "ग्राउंडिंग श्वास",
      "admin.title": "कॅम्पस विश्लेषण", "counselor.title": "काउंसेलर डॅशबोर्ड",
      "crisis.line": "संकटात? 24x7 हेल्पलाइन", "lang": "भाषा"
    },
    gu: {
      "nav.home": "હોમ", "nav.checkin": "દૈનિક પલ્સ", "nav.peer": "સાથી સર્કલ",
      "nav.counselor": "કાઉન્સેલર", "nav.resources": "લાઇબ્રેરી", "nav.privacy": "ગોપનીયતા",
      "nav.dashboard": "પ્રગતિ", "nav.journal": "પ્રતિબિંબ", "nav.breathing": "રીસેટ",
      "nav.admin": "એડમિન", "nav.counselorDash": "કાઉન્સેલર હબ",
      "start": "બિન-ઓળખીતા શરૂ કરો", "howProtect": "ગોપનીયતા કેવી રીતે કામ કરે છે",
      "hero.title1": "વિદ્યાર્થીઓ માટે વેલબીઇંગ સિસ્ટમ", "hero.title2": "જે સંકટ પહેલાં સાથે આપે છે.",
      "hero.sub": "Vistaraz વિદ્યાર્થીઓને અનામિક ચેક-ઇન, સૌમ્ય AI પ્રતિબિંબ અને યોગ્ય માનવીય મદદ સુધી કલંક વગર પહોંચવામાં મદદ કરે છે.",
      "trustFunnel": "ઇકોસિસ્ટમ કેવી રીતે કામ કરે છે", "trustSub": "પ્રથમ અનામિકતા, પછી માનવીય આધાર, અને ત્યારબાદ AI — બધું સાથી સર્કલ અને કાઉન્સેલર સાથે.",
      "whyWins": "આ સુરક્ષિત કેમ લાગે છે", "tryCheckin": "30-સેકન્ડ પલ્સ અજમાવો",
      "checkin.title": "દૈનિક પલ્સ", "checkin.sub": "અનામિક, ઝડપી, અને ફક્ત આ ઉપકરણ પર ખાનગી.",
      "mood.q": "આજે તમારો સંતુલન કેમ છે?", "sleep.q": "તાજેતરમાં તમારી ઊંઘ કેવી રહી?",
      "support.q": "શું તમને આજુબાજુના લોકોનો આધાર લાગે છે?", "mind.q": "શું વાત મન પર છે? (વૈકલ્પિક)",
      "seePath": "મારો માર્ગ જુઓ", "recommended": "ભલામણ કરેલ", "severity": "ગંભીરતા",
      "peer.title": "સાથી સર્કલ", "peer.sub": "તાલીમ પામેલા વરિષ્ઠ વિદ્યાર્થીઓ જે ન્યાય કર્યા વગર સાંભળે છે.",
      "resources.title": "સહાય લાઇબ્રેરી", "resources.sub": "હિન્દી, અંગ્રેજી, મરાઠી અને ગુજરાતી માં કામના સાધનો.",
      "privacy.title": "અમે તમારી ગોપનીયતા કેવી રીતે જાળીએ છીએ", "dashboard.title": "પ્રગતિ ડેશબોર્ડ",
      "journal.title": "પ્રતિબિંબ જર્નલ", "breathing.title": "ગ્રાઉન્ડિંગ શ્વાસ",
      "admin.title": "કેમ્પસ વિશ્લેષણ", "counselor.title": "કાઉન્સેલર ડેશબોર્ડ",
      "crisis.line": "કટોકટીમાં? 24x7 હેલ્પલાઇન", "lang": "ભાષા"
    }
  };

  function getLang() {
    try { return localStorage.getItem("vistaraz_lang") || "en"; } catch (e) { return "en"; }
  }
  function setLang(l) { try { localStorage.setItem("vistaraz_lang", l); } catch (e) {} }
  function t(key) {
    const l = getLang();
    return (STR[l] && STR[l][key]) || (STR.en[key]) || key;
  }

  global.Vistaraz = global.Vistaraz || {};
  global.Vistaraz.i18n = { t, getLang, setLang, langs: ["en", "hi", "mr", "gu"] };
})(window);
