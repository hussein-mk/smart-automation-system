

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);

/**
 * تشغيل الموقع
 */
function initializeApp() {

  initializeStatistics();

  initializeAppointments();

  initializeForm();

  console.log(
    "ProSys Legal Loaded Successfully"
  );

}

/* ===================================
   Statistics
=================================== */

function initializeStatistics() {

  animateNumbers();

}

function animateNumbers() {

  const counters =
    document.querySelectorAll(
      ".glass-card h3"
    );

  counters.forEach(counter => {

    const target =
      parseInt(
        counter.innerText.replace(/,/g, "")
      );

    if (isNaN(target)) return;

    let current = 0;

    const increment =
      Math.ceil(target / 100);

    const timer =
      setInterval(() => {

        current += increment;

        if (current >= target) {

          current = target;

          clearInterval(timer);

        }

        counter.innerText =
          current.toLocaleString();

      }, 15);

  });

}

/* ===================================
   Appointment Form
=================================== */

function initializeForm() {

  const form =
    document.querySelector("form");

  if (!form) return;

  form.addEventListener(
    "submit",
    handleAppointmentSubmit
  );

}

function handleAppointmentSubmit(event) {

  event.preventDefault();

  const inputs =
    document.querySelectorAll("form input");

  const clientName =
    inputs[0].value.trim();

  const phone =
    inputs[1].value.trim();

  const email =
    inputs[2].value.trim();

  const date =
    inputs[3].value;

  const time =
    inputs[4].value;

  if (
    !clientName ||
    !phone ||
    !date ||
    !time
  ) {

    alert(
      "يرجى تعبئة جميع الحقول المطلوبة"
    );

    return;

  }

  const appointment = {

    id: Date.now(),

    clientName,

    phone,

    email,

    date,

    time

  };

  saveAppointment(
    appointment
  );

  addAppointmentToUI(
    appointment
  );

  formReset();

  alert(
    "تم تسجيل الموعد بنجاح"
  );

}

/* ===================================
   Local Storage
=================================== */

function saveAppointment(
  appointment
) {

  const appointments =
    getAppointments();

  appointments.push(
    appointment
  );

  localStorage.setItem(
    "appointments",
    JSON.stringify(
      appointments
    )
  );

}

function getAppointments() {

  return JSON.parse(
    localStorage.getItem(
      "appointments"
    )
  ) || [];

}

/* ===================================
   Load Appointments
=================================== */

function initializeAppointments() {

  const appointments =
    getAppointments();

  appointments.forEach(
    appointment => {

      addAppointmentToUI(
        appointment
      );

    }
  );

}

function addAppointmentToUI(
  appointment
) {

  const container =
    document.querySelector(
      ".space-y-4"
    );

  if (!container) return;

  const card =
    document.createElement(
      "div"
    );

  card.className =
    "appointment-item";

  card.innerHTML = `

    <h4>
      ${appointment.clientName}
    </h4>

    <p>
      ${appointment.date}
    </p>

    <span>
      ${appointment.time}
    </span>

  `;

  container.prepend(
    card
  );

}

/* ===================================
   Helpers
=================================== */

function formReset() {

  const form =
    document.querySelector(
      "form"
    );

  if (form) {

    form.reset();

  }

}

/* ===================================
   Dark Theme Future Support
=================================== */

function toggleTheme() {

  document.body.classList.toggle(
    "dark-theme"
  );

}

/* ===================================
   Export
=================================== */

window.ProSys = {

  getAppointments,

  saveAppointment

};
