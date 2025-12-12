
    gsap.registerPlugin(ScrollTrigger);
        const logo = document.getElementById("logo");//appelle la div
        const tllogo = gsap.timeline();  
        const tlpresentation = gsap.timeline();                     // creer la time line
        ScrollTrigger.create({                             // creer l'evenement 
            trigger: "body",                       //zone que l'on regarde pour déclencher l'animation
            start: "top top",
            end: "bottom top",
            scrub: 1,
            markers: false,
            animation: tllogo,
        })                                  

        tllogo.to(logo,{          //time line de l animation
            opacity: -0.4,
            scale: 12,
            duration:20,
            rotation:250,
        })
 
        ScrollTrigger.create({                  //timeline présentation
            trigger:".photo",
            start: "top 60%",
            end:"center +80px",
            scrub:1,
            markers: false,
            animation: tlpresentation,
        })

        tlpresentation.from(photoCoach1,{       
            opacity: -0.1,
            y: "+100px"
        })
        tlpresentation.to(photoCoach1,{
            opacity: 1,

        })
 
        tlpresentation.from(photoCoach2,{
            opacity: -0.1,
            y:"+100px"
        })

        tlpresentation.to(photoCoach2,{
            opacity: 1,

        })

        tlpresentation.from(club,{
            opacity: -0.1,
            y:"+100px"
        })

        tlpresentation.to(club,{
            opacity: 1,

        })

