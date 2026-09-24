const inputs = document.querySelectorAll("input[data-target]");

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return day + "/" + month + "/" + year;
}

inputs.forEach((input) => {
  const target = document.getElementById(input.dataset.target);

  input.addEventListener("input", () => {
    target.textContent = input.type === "date" ? formatDate(input.value) : input.value;
    setLanguage(langSelect.value);
  });
});

document.getElementById("print-btn").addEventListener("click", () => {
  window.print();
});

const translations = {
  ne: {
    title: "शल्यक्रिया, औषधि उपचार तथा एनेस्थेसियाका लागि\nसूचित सहमति पत्र",
    patientName: "बिरामीको नाम",
    ageSex: "उमेर र लिङ्ग",
    father: "अभिभावक वा पति/पत्नीको नाम",
    address: "पूरा ठेगाना",
    phone: "सम्पर्क फोन नम्बर",
    procedure: "शल्यक्रियाको नाम",
    surgeon: "शल्यचिकित्सक",
    physician: "फिजिसियन वा मेडिकल अफिसर",
    referrer: "रेफर गर्ने अस्पताल वा क्लिनिक",
    date: "मिति",
    c1: "म स्वयं आफ्नै इच्छाले यस केन्द्रमा आएको हुँ। मेरो उपचारका लागि यहाँ कुन कुन सुविधा उपलब्ध छन् भन्ने कुरा मैले बुझेको छु।",
    c2: "शल्यचिकित्सक {dr} {surgeon} र उनको टोलीलाई माथि उल्लिखित शल्यक्रिया मेरो (वा माथि उल्लिखित बिरामीको) शरीरमा गर्न म अनुमति दिन्छु। यो शल्यक्रिया किन गरिँदैछ, यसका फाइदा, यसमा हुने जोखिम, अवस्था झन् बिग्रन सक्ने सम्भावना र अन्य विकल्पहरूबारे डाक्टरले मैले बुझ्ने भाषामा जानकारी दिनुभएको छ। मेरा प्रश्नहरूको उत्तर पाएको छु र शल्यक्रिया अगाडि बढाउन म राजी छु।",
    c3: "मेरो अवस्था हेरेर डाक्टर र उनको टोलीले उपयुक्त ठानेको कुनै पनि प्रकारको एनेस्थेसिया (बेहोसी) दिन म अनुमति दिन्छु।",
    c4: "शल्यक्रियाका बेला चाहिने औषधि दिन र आवश्यक परे रगत चढाउन म डाक्टरलाई अनुमति दिन्छु। रगत आवश्यक परेमा त्यसको व्यवस्था गर्ने जिम्मेवारी हाम्रो हो भन्ने कुरा मैले बुझेको छु।",
    c5: "शल्यक्रियाका बेला आकस्मिक अवस्था आइपर्दा योजना गरिएकोभन्दा बढी वा फरक शल्यक्रिया वा उपचार आवश्यक हुन सक्छ भन्ने कुरा मैले बुझेको छु, जस्तै ल्यापारोस्कोपिक (दूरबीन) शल्यक्रियालाई खुला शल्यक्रियामा बदल्नुपर्ने अवस्था। मेरो ज्यान वा स्वास्थ्यको रक्षाका लागि डाक्टरले आवश्यक ठाने त्यस्तो शल्यक्रिया वा उपचार गर्न म अनुमति दिन्छु।",
    signature: "बिरामी वा अभिभावकको हस्ताक्षर",
    witness: "साक्षीको हस्ताक्षर",
    doctorSign: "डाक्टरको हस्ताक्षर",
    dr: "डा."
  },
  en: {
    title: "Informed Consent for Surgery,\nMedical Treatment and Anaesthesia",
    patientName: "Patient name",
    ageSex: "Age and sex",
    father: "Guardian's or spouse's name",
    address: "Complete address",
    phone: "Telephone no.",
    procedure: "Procedure",
    surgeon: "Surgeon",
    physician: "Physician or MO on board",
    referrer: "Referring hospital or clinic",
    date: "Date",
    c1: "I have come to this centre of my own free will, and I understand what facilities are available here for my treatment.",
    c2: "I authorise the surgeon, {dr} {surgeon}, and his/her team to perform the procedure named above on me (or on the patient named above). The doctor has explained to me, in a language I understand, why the procedure is being done, its benefits, the risks involved, the possibility that the condition may get worse, and the alternatives. My questions have been answered, and I agree to go ahead.",
    c3: "I authorise the doctor and team to give whatever type of anaesthesia they consider proper for my case.",
    c4: "I authorise the doctor to give the medicines needed during the surgery and to give blood if it is needed. I understand that if blood is required, it is our duty and responsibility to arrange it.",
    c5: "I understand that an emergency may arise during surgery that needs extra or different surgery or treatment beyond what was planned, for example changing keyhole (laparoscopic) surgery to open surgery. I authorise the doctor and team to carry out such surgery or treatment if they consider it necessary to protect my life or health.",
    signature: "Patient or guardian signature",
    witness: "Witness signature",
    doctorSign: "Doctor's signature",
    dr: "Dr."
  }
};

const langSelect = document.getElementById("lang-select");

function fill(text, dr) {
  const surgeon = document.querySelector('[data-target="p-surgeon"]').value.trim();
  return text.replaceAll("{dr}", dr).replaceAll("{surgeon}", surgeon || "____________");
}

function setLanguage(lang) {
  const isBoth = lang === "both";
  const dr = isBoth ? translations.en.dr : translations[lang].dr;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;

    if (isBoth) {
      let sep = " / ";
      if (el.dataset.sep === "line") sep = "\n";
      if (el.dataset.sep === "para") sep = "\n\n";
      el.textContent = fill(translations.ne[key] + sep + translations.en[key], dr);
    } else {
      el.textContent = fill(translations[lang][key], dr);
    }
  });

  ["p-surgeon", "p-physician"].forEach((id) => {
    const name = document.querySelector('[data-target="' + id + '"]').value.trim();
    document.getElementById(id).dataset.prefix = name ? dr + " " : "";
  });

  document.documentElement.lang = isBoth ? "ne" : lang;
}

langSelect.addEventListener("change", () => setLanguage(langSelect.value));

setLanguage(langSelect.value);