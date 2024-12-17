    //  next lines not conected by HTML until now
    function setToken(token) {
        document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;
      }
      const passwordInput = document.getElementById("password");
      const usernameInput = document.getElementById("name");
      const togglePasswordIcon = document.getElementById("togglePasswordIcon");
      const loginButton = document.getElementById("loginButton");
  
      togglePasswordIcon.addEventListener("click", function () {
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          togglePasswordIcon.src = "assets/show.svg";
          togglePasswordIcon.classList.remove("show_password_image");
          togglePasswordIcon.classList.add("hide_password_image");
        } else {
          passwordInput.type = "password";
          togglePasswordIcon.src = "assets/hide.png";
          togglePasswordIcon.classList.remove("hide_password_image");
          togglePasswordIcon.classList.add("show_password_image");
        }
      });
  
      loginButton.addEventListener("click", async function (e) {
        e.preventDefault()
        const Username = usernameInput.value;
        const Password = passwordInput.value;
  
        if (!Username || !Username) {
          alert("يرجى إدخال اسم المستخدم وكلمة المرور!");
          return;
        }
  
        try {
          const response = await fetch(
            "https://back.envaglo.net/api/employee/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // تحديد نوع البيانات المرسلة
              },
              body: JSON.stringify({
                Username, // إرسال البيانات كـ JSON
                Password,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("فشل في تسجيل الدخول");
          }
          const result = await response.json();
          setToken(result.access_token);
        } catch (error) {
          console.error("خطأ:", error);
        }
      });