window.addEventListener('load', function() {

    // Scroll Icon indicator opacity change based on viewport Y positioning
    let scrollIndicator = document.getElementById('scroll-icon-container');

    if (window.pageYOffset < 101) {
        scrollIndicator.style.opacity = 1 - (window.pageYOffset/ 100);
    }
    else if (window.pageYOffset >= 101) {
        scrollIndicator.style.opacity = 0;
    }

    window.addEventListener('scroll', function() {
        if (window.pageYOffset < 101) {
            scrollIndicator.style.opacity = 1 - (window.pageYOffset/ 100);
        }
        else if (window.pageYOffset >= 101) {
            scrollIndicator.style.opacity = 0;
        }
    })

    // Sidebar Hamburger Click event
    document.getElementById('hamburger-btn-lp').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburger-nav-lp');
        const cross = document.getElementById('cross-nav-lp');
        const buttonContainer = document.getElementById('hamburger-btn-lp');

        // Sidebar Moving in and out of view
        if (sidebar.classList == "sidebarInactive" || sidebar.classList == "sidebarActiveMoveRight") {
            sidebar.classList.remove("sidebarInactive");
            sidebar.classList.remove("sidebarActiveMoveRight");
            sidebar.classList.add("sidebarActiveMoveLeft");
        }

        else if (sidebar.classList == "sidebarActiveMoveLeft") {
            sidebar.classList.remove("sidebarActiveMoveLeft");
            sidebar.classList.add("sidebarActiveMoveRight");
        }

        // Sidebar Nav Icon FadeIn and FadeOut
        if (hamburger.classList == 0 || hamburger.classList == "sidebarIconFadeIn") {

            hamburger.classList.remove("sidebarIconFadeIn");
            hamburger.classList.add("sidebarIconFadeOut");

            cross.classList.remove("sidebarIconFadeOut");
            cross.classList.add("sidebarIconFadeIn");

            buttonContainer.style.position = "fixed";
            buttonContainer.style.right = "5%";

        }

        else if (hamburger.classList == "sidebarIconFadeOut") {

            buttonContainer.style.position = "relative";
            buttonContainer.style.right = "0";

            hamburger.classList.remove("sidebarIconFadeOut");
            hamburger.classList.add("sidebarIconFadeIn");

            cross.classList.remove("sidebarIconFadeIn");
            cross.classList.add("sidebarIconFadeOut");
        }

        window.addEventListener('resize', function() {
            if (window.innerWidth > 900) {
                sidebar.classList.add("sidebarActiveMoveRight");
                sidebar.classList.remove("sidebarActiveMoveLeft");

                hamburger.classList.remove("sidebarIconFadeOut");
                hamburger.classList.add("sidebarIconFadeIn");

                cross.style.opacity = "0";
                cross.classList.remove("sidebarIconFadeIn");
                cross.classList.remove("sidebarIconFadeOut");
            }
        })
    })
})

