let selectedMode = 'regular';
const coursesByCollege = {
    "COAc": ["Bachelor of Science in Accountancy", "Bachelor of Science in Accounting Information System"],
    "COAg": ["Bachelor of Science in Agriculture"],
    "CAS": ["Bachelor of Arts in Economics", "Bachelor of Arts in Political Science", "Bachelor of Science in Biology", "Bachelor of Science in Psychology", "Bachelor of Public Administration"],
    "CBA": ["Bachelor of Science in Business Administration Major in Financial Management", "Bachelor of Science in Business Administration Major in Human Resource Development Management", "Bachelor of Science in Business Administration Major in Legal Management", "Bachelor of Science in Business Administration Major in Marketing Management", "Bachelor of Science in Entrepreneurship", "Bachelor of Science in Real Estate Management"],
    "COC": ["Bachelor of Arts in Broadcasting", "Bachelor of Arts in Communication", "Bachelor of Arts in Journalism"],
    "ICS": ["Bachelor of Library and Information Science", "Bachelor of Science in Information Technology", "Bachelor of Science in Computer Science", "Bachelor of Science in Entertainment and Multimedia Computing with Specialization in Digital Animation Technology", "Bachelor of Science in Entertainment and Multimedia Computing with Specialization in Game Development", "Bachelor of Science in Information System"],
    "COCC":["Bachelor of Science in Criminology"],
    "CED": ["Bachelor of Elementary Education", "Bachelor of Elementary Education with Specialization in Preschool Education", "Bachelor of Elementary Education with Specialization in Special Education", "Bachelor of Secondary Education Major in Music, Arts, and Physical Education", "Bachelor of Secondary Education Major in English", "Bachelor of Secondary Education Major in Filipino", "Bachelor of Secondary Education Major in Mathematics", "Bachelor of Secondary Education Major in Science", "Bachelor of Secondary Education Major in Social Studies", "Bachelor of Secondary Education Major in Technology and Livelihood Education"],
    "CEA": ["Bachelor of Science in Architecture", "Bachelor of Science in Astronomy", "Bachelor of Science in Civil Engineering", "Bachelor of Science in Electrical Engineering", "Bachelor of Science in Electronics Engineering", "Bachelor of Science in Industrial Engineering", "Bachelor of Science in Mechanical Engineering"],
    "CMT": ["Bachelor of Science in Medical Technology"],
    "CM": ["Diploma in Midwifery"],
    "COM": ["Bachelor of Music in Choral Conducting", "Bachelor of Music in Music Education", "Bachelor of Music in Piano", "Bachelor of Music in Voice"],
    "CON": ["Bachelor of Science in Nursing"],
    "CPT": ["Bachelor of Science in Physical Therapy"],
    "CRT": ["Bachelor of Science in Respiratory Therapy"],
    "SOIR": ["Bachelor of Arts in Foreign Service"],
    "SGS": ["Doctor in Business Administration", "Master in Business Administration", "Master in Business Administration Major in Human Resource Management", "Master in Business Administration Major in Organizational Development", "Doctor of Philosophy in Education Major in Bilingual Education", "Doctor of Philosophy in Education Major in Early Childhood Education",
            "Doctor of Philosophy in Education Major in Educational Leadership", "Doctor of Philosophy in Education Major in Educational Management", "Doctor of Philosophy in Education Major in Guidance & Counseling", "Doctor of Philosophy in Education Major in Instructional Leadership", "Doctor of Philosophy in Education Major in Special Education and Inclusive Education", "Master of Arts in Education Major in Early Childhood Education",
            "Master of Arts in Education Major in Educational Management", "Master of Arts in Education Major in Educational Psychology", "Master of Arts in Education Major in Educational Technology", "Master of Arts in Education Major in Environmental Education", "Master of Arts in Education Major in Filipino", "Master of Arts in Education Major in Guidance and Counseling",
            "Master of Arts in Education Major in Language Education", "Master of Arts in Education Major in Mathematics Education", "Master of Arts in Education Major in Reading Education", "Master of Arts in Education Major in Science Education", "Master of Arts in Education Major in Social Science", "Master of Arts in Education Major in Special Education and Inclusive Education"
        ], 
    "STAFF": ["Staff"],
    "Visitor": ["Visitor"] 
};


function switchLoginMode(mode) {
    selectedMode = mode;
    document.getElementById('btn-reg').classList.toggle('active', mode === 'regular');
    document.getElementById('btn-adm').classList.toggle('active', mode === 'admin');

    document.getElementById('login-title').innerText = mode === 'admin' ? "Admin Portal" : "New Era University Library Visitor Log";
    document.getElementById('login-hint').innerText = mode === 'admin' ? "Admin credentials required." : "Enter your institutional email to proceed.";

    // Hide register link in admin mode
    document.getElementById('register-link-wrap').style.display = mode === 'admin' ? 'none' : '';
}

function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const clockEl = document.getElementById('live-clock');
    if(clockEl) {
        clockEl.innerText = "Philippine Standard Time: " + now.toLocaleTimeString('en-US', options);
        document.getElementById('current-date-display').innerText = now.toLocaleDateString('en-US', dateOptions);
    }
}

setInterval(updateTime, 1000);

function updateCourses() {
    const college = document.getElementById('college-select').value;
    const courseSelect = document.getElementById('course-select');
    courseSelect.innerHTML = '<option value="" disabled selected>Select Program/Course</option>';

    if (coursesByCollege[college]) {
        coursesByCollege[college].forEach(course => {
            let opt = document.createElement('option');
            opt.value = course; opt.innerHTML = course;
            courseSelect.appendChild(opt);
        });
    }
}

function handleLogin() {
    const email = document.getElementById('email-input').value.toLowerCase();
    const pass = document.getElementById('pass-input').value;
    if (!email || !pass) { alert("Please enter credentials."); return; }

    if (selectedMode === 'admin') {
        if (email === "jcesperanza@neu.edu.ph") {
            document.getElementById('login-container').classList.add('hidden');
            document.getElementById('app-content').style.display = 'block';
            document.getElementById('visitor-form').classList.add('hidden');
            document.getElementById('admin-dashboard').classList.remove('hidden');
            document.getElementById('view-title').innerText = "Admin Analytics Dashboard";
            document.getElementById('welcome-msg').innerText = "System Administrator Access";
            document.getElementById('top-switcher').style.display = 'none';
            initChart();
            updateTime();
        } else {
            alert("Unauthorized Admin Access.");
        }

    } else {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('app-content').style.display = 'block';
        document.getElementById('visitor-form').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
    }
}


function submitLog() {
    const name = document.getElementById('v-name').value;
    const id = document.getElementById('v-id').value;
    const college = document.getElementById('college-select').value;
    const course = document.getElementById('course-select').value;
    const type = document.getElementById('visitor-type').value;
    const reason = document.getElementById('v-reason').value;

    if(!name || !id || !college || !course) { alert("Complete all fields."); return; }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const table = document.getElementById('visitor-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(0);

    newRow.setAttribute('data-college', college);
    newRow.setAttribute('data-reason', reason);
    newRow.innerHTML = `<td>${timeStr}</td><td>${name}</td><td>${id}</td><td>${college}</td><td>${course}</td><td>${type}</td>`;

    let currentCount = parseInt(document.getElementById('total-v-count').innerText);
    document.getElementById('total-v-count').innerText = currentCount + 1;

    alert("Success! Welcome, " + name);

    // Reset fields
    document.getElementById('v-name').value = ""; 
    document.getElementById('v-id').value = "";
}

function filterTable() {
    const collegeFilter = document.getElementById('filter-college').value;
    const reasonFilter = document.getElementById('filter-reason').value;
    const rows = document.querySelectorAll('#visitor-table tbody tr');

    rows.forEach(row => {
        const colMatch = collegeFilter === 'all' || row.getAttribute('data-college') === collegeFilter;
        const reasonMatch = reasonFilter === 'all' || row.getAttribute('data-reason') === reasonFilter;
        row.style.display = (colMatch && reasonMatch) ? '' : 'none';
    });
}

function initChart() {
    const ctx = document.getElementById('statChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['08:00', '10:00', '12:00', '14:00', '16:00'],
            datasets: [{
                label: 'Hourly Volume',
                data: [5, 25, 45, 30, 15],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                fill: true, tension: 0.4
            }]
        },

        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            },

            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}


/* ── ADDED: Register functions ── */
function showRegister() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('register-container').classList.remove('hidden');
    document.getElementById('top-switcher').style.display = 'none';
}

function showLogin() {
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('top-switcher').style.display = '';
}

function updateRegCourses() {
    const college = document.getElementById('reg-college').value;
    const courseSelect = document.getElementById('reg-course');
    courseSelect.innerHTML = '<option value="" disabled selected>Select Program / Course</option>';

    if (coursesByCollege[college]) {
        coursesByCollege[college].forEach(course => {
            let opt = document.createElement('option');
            opt.value = course; opt.textContent = course;
            courseSelect.appendChild(opt);
        });
    }
}

function handleRegister() {
    const name    = document.getElementById('reg-name').value.trim();
    const email   = document.getElementById('reg-email').value.trim().toLowerCase();
    const id      = document.getElementById('reg-id').value.trim();
    const college = document.getElementById('reg-college').value;
    const course  = document.getElementById('reg-course').value;
    const pass    = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-confirm').value;

    if (!name || !email || !id || !college || !course || !pass || !confirm) {
        alert("Please fill in all fields."); return;
    }

    if (!email.endsWith('@neu.edu.ph')) {
        alert("Please use your institutional email (@neu.edu.ph)."); return;
    }

    if (pass.length < 6) {
        alert("Password must be at least 6 characters."); return;
    }

    if (pass !== confirm) {
        alert("Passwords do not match."); return;
    }

    alert("Account created successfully!\nWelcome, " + name + ".\nYou may now log in with your credentials.");
    showLogin();
}
