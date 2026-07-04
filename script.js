// JavaScript Logic for Marwan Ahmed's Portfolio

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Mobile Navigation Menu Toggle
    // ==========================================
    const mobileToggle = document.getElementById("mobile-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle("open");
            // Toggle icon classes
            const icon = mobileToggle.querySelector("i");
            if (icon) {
                if (mobileNav.classList.contains("open")) {
                    icon.className = "fa-solid fa-xmark";
                } else {
                    icon.className = "fa-solid fa-bars-staggered";
                }
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (mobileNav.classList.contains("open") && !mobileNav.contains(e.target) && e.target !== mobileToggle) {
                mobileNav.classList.remove("open");
                const icon = mobileToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars-staggered";
            }
        });

        // Close mobile menu when clicking nav links
        const mobileLinks = mobileNav.querySelectorAll(".mobile-nav-link");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("open");
                const icon = mobileToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars-staggered";
            });
        });
    }

    // ==========================================
    // 2. Project Detailed Case Studies Modals
    // ==========================================
    const openModalButtons = document.querySelectorAll(".open-modal-trigger");
    const modals = document.querySelectorAll(".project-modal");
    const closeModalButtons = document.querySelectorAll(".close-modal-btn");
    const modalBackdrops = document.querySelectorAll(".modal-backdrop");

    // Open Modal
    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-modal");
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add("show");
                targetModal.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden"; // Disable background scrolling
            }
        });
    });

    // Close Modals function
    const closeAllModals = () => {
        modals.forEach(modal => {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
        });
        document.body.style.overflow = ""; // Re-enable background scrolling
    };

    closeModalButtons.forEach(button => {
        button.addEventListener("click", closeAllModals);
    });

    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener("click", closeAllModals);
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllModals();
        }
    });

    // ==========================================
    // 3. Interactive Workflow Simulator
    // ==========================================
    const runSimBtn = document.getElementById("run-sim-btn");
    const consoleLogs = document.getElementById("console-logs");
    
    // Nodes
    const nodeTrigger = document.getElementById("sim-node-trigger");
    const nodeAgent = document.getElementById("sim-node-agent");
    const nodeDb = document.getElementById("sim-node-db");
    const nodeAction = document.getElementById("sim-node-action");
    
    // Status Text Spans
    const status1 = document.getElementById("status-1");
    const status2 = document.getElementById("status-2");
    const status3 = document.getElementById("status-3");
    const status4 = document.getElementById("status-4");

    // Connecting Lines
    const lines = document.querySelectorAll(".sim-flow-line");

    // Simulator Console Helpers
    const clearConsole = () => {
        consoleLogs.innerHTML = "";
    };

    const addConsoleLine = (text, type = "muted") => {
        const line = document.createElement("div");
        line.className = `console-line text-${type}`;
        
        // Add timestamp in JetBrains Mono style
        const now = new Date();
        const timeStr = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
        
        line.innerHTML = `<span>${timeStr}</span> &gt; ${text}`;
        consoleLogs.appendChild(line);
        consoleLogs.scrollTop = consoleLogs.scrollHeight; // Auto scroll
    };

    if (runSimBtn) {
        runSimBtn.addEventListener("click", () => {
            // Disable button
            runSimBtn.disabled = true;
            runSimBtn.style.opacity = "0.6";
            runSimBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> جارِ التشغيل (Running Workflow)...`;

            // Reset States
            clearConsole();
            addConsoleLine("بدء تهيئة تدفق العمل الآلي...", "info");
            
            // Invalidate nodes status
            nodeTrigger.className = "sim-node";
            nodeAgent.className = "sim-node";
            nodeDb.className = "sim-node";
            nodeAction.className = "sim-node";

            status1.textContent = "في الانتظار (Idle)";
            status2.textContent = "في الانتظار (Idle)";
            status3.textContent = "في الانتظار (Idle)";
            status4.textContent = "في الانتظار (Idle)";

            lines.forEach(line => line.classList.remove("active"));

            // Simulation steps sequence
            
            // Step 1: Trigger Webhook
            setTimeout(() => {
                nodeTrigger.classList.add("active");
                status1.textContent = "نشط (Triggered)";
                addConsoleLine("استقبال الحدث: تم استلام صورة الفاتورة عبر Telegram Webhook بنجاح.", "success");
                addConsoleLine("تنزيل ملف الفاتورة وتمرير البيانات لمحرك الأتمتة (Payload loaded).", "muted");
                
                // Active flow line 1
                if (lines[0]) lines[0].classList.add("active");
            }, 500);

            // Step 2: Agent (LLM Processing)
            setTimeout(() => {
                nodeTrigger.classList.remove("active");
                nodeAgent.classList.add("processing");
                status1.textContent = "مكتمل (Success)";
                status2.textContent = "جارِ المعالجة (AI Processing)";
                
                addConsoleLine("وكيل الذكاء الاصطناعي نشط: استدعاء GPT-4o-Vision لقراءة محتوى الفاتورة.", "info");
                addConsoleLine("جارِ استخراج البنود... المورد: 'مكتبة الشرق'، الإجمالي: '5,400 ج.م'، الضريبة: '756 ج.م'.", "muted");
                addConsoleLine("تم التحقق من صحة القوانين الحسابية للفاتورة (دقة 100%).", "success");

                // Active flow line 2
                if (lines[1]) lines[1].classList.add("active");
            }, 2500);

            // Step 3: Database Storage
            setTimeout(() => {
                nodeAgent.classList.remove("processing");
                nodeDb.classList.add("active");
                status2.textContent = "مكتمل (Success)";
                status3.textContent = "جارِ الحفظ (Writing Data)";

                addConsoleLine("استدعاء Google Sheets API لربط الدفتر المالي للشركة.", "info");
                addConsoleLine("تم ترحيل السجل بنجاح لـ Google Sheet (الخلية A156-G156).", "success");
                addConsoleLine("توليد ملف مستندي مهيكل وحفظ نسخة احتياطية على Dropbox.", "muted");

                // Active flow line 3
                if (lines[2]) lines[2].classList.add("active");
            }, 4500);

            // Step 4: Action/Notification
            setTimeout(() => {
                nodeDb.classList.remove("active");
                nodeAction.classList.add("processing");
                status3.textContent = "مكتمل (Success)";
                status4.textContent = "جارِ الإرسال (Notifying)";

                addConsoleLine("استدعاء نظام الإشعارات لإبلاغ المدير المالي بالعملية.", "info");
                addConsoleLine("تم إرسال إشعار تأكيدي عبر قناة Slack وتليجرام مخصصة بالإحصائيات.", "success");
                addConsoleLine("إرسال رسالة شكر تلقائية للمورد عبر البريد الإلكتروني.", "muted");
            }, 6500);

            // Finish Simulation
            setTimeout(() => {
                nodeAction.className = "sim-node active";
                status4.textContent = "مكتمل (Done)";
                
                addConsoleLine("✓ تم إكمال تشغيل مسار الأتمتة بنجاح خلال 6 ثوانٍ ووفر 15 دقيقة من العمل اليدوي!", "success");
                
                // Restore Button
                runSimBtn.disabled = false;
                runSimBtn.style.opacity = "1";
                runSimBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i> تشغيل تدفق العمل (Run Automation)`;
            }, 8000);
        });
    }

    // ==========================================
    // 4. Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const revealSections = document.querySelectorAll("section");
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target); // Reveal once
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealSections.forEach(section => {
        section.classList.add("reveal-hidden");
        sectionObserver.observe(section);
    });

    // Style injection for scroll reveal classes
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .reveal-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

    // ==========================================
    // 5. Active Nav link on scroll
    // ==========================================
    const navLinks = document.querySelectorAll(".nav-links .nav-link:not(.contact-btn-nav)");
    
    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        revealSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 120)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================
    // 6. Stats Counter Animation
    // ==========================================
    const statsNum = document.querySelectorAll(".stat-num");
    let counterAnimated = false;

    const animateCounters = () => {
        statsNum.forEach(counter => {
            const targetValStr = counter.getAttribute("data-val");
            const targetVal = parseFloat(targetValStr);
            let currentVal = 0;
            const duration = 2000; // ms
            const stepTime = 30; // ms
            const steps = duration / stepTime;
            const increment = targetVal / steps;

            const updateCounter = setInterval(() => {
                currentVal += increment;
                if (currentVal >= targetVal) {
                    clearInterval(updateCounter);
                    // Formatting suffixes (like %, +)
                    if (targetValStr.includes("%")) {
                        counter.textContent = `${Math.floor(targetVal)}%`;
                    } else if (targetValStr.includes("+")) {
                        counter.textContent = `${Math.floor(targetVal)}+`;
                    } else {
                        counter.textContent = Math.floor(targetVal);
                    }
                } else {
                    counter.textContent = Math.floor(currentVal);
                }
            }, stepTime);
        });
    };

    // Trigger counters when stats section enters viewport
    const heroSection = document.getElementById("about");
    if (heroSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        }, { threshold: 0.2 });
        statsObserver.observe(heroSection);
    }

    // ==========================================
    // 7. Contact Form Integration (FormSubmit API)
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector(".btn-submit-form");
            const origText = submitBtn.innerHTML;
            
            const name = document.getElementById("form-name").value;
            const email = document.getElementById("form-email").value;
            const phone = document.getElementById("form-phone").value;
            const message = document.getElementById("form-message").value;

            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> جارِ إرسال طلبك إلى الإيميل...`;
            formStatus.className = "form-status-msg";
            formStatus.style.display = "none";

            // Submit using FormSubmit AJAX API
            fetch("https://formsubmit.co/ajax/maroooahmedddhh@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Phone: phone,
                    Message: message,
                    _subject: `طلب أتمتة جديد من البورتفوليو: ${name}`
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.");
                }
            })
            .then(data => {
                // Success message
                formStatus.className = "form-status-msg success";
                formStatus.textContent = "تم إرسال رسالتك وقائمة الأتمتة بنجاح إلى إيميل مروان! (إذا كانت هذه أول مرة، يرجى تفعيل الخدمة من الرسالة الواردة إليك).";
                
                // Clear fields
                contactForm.reset();
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = origText;
            })
            .catch(error => {
                // Error message
                formStatus.className = "form-status-msg error";
                formStatus.textContent = error.message || "فشل الاتصال بالخادم. يرجى التحقق من شبكة الإنترنت.";
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = origText;
            });
        });
    }
});
