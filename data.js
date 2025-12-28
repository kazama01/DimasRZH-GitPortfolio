const portfolioData = {
    profile: {
        name: "Dimas Rizky Hutama",
        role: "Technical Artist | Shader Creation | VFX",
        summary: "Dynamic and passionate Technical Artist with over 3 years of hands-on experience in game development. My expertise includes shader creation, visual effects (VFX), computer graphics, scripting (C#, HLSL, LUA), Unity URP/HDRP, and AR/VR Mobile/Game optimization. I bridge the gap between artistic vision and technical execution.",
        location: "Banyuwangi, East Java, Indonesia",
        social: {
            linkedin: "https://linkedin.com/in/dimas-rizky-hutama", // Placeholder based on name
            email: "dimas.hutama01@gmail.com" // Placeholder
        }
    },
    skills: {
        core: ["Technical Art", "Shader Creation", "VFX", "Game Optimization", "Computer Graphics", "Render Pipelines (URP/HDRP)"],
        technical: ["Unity", "Unreal Engine", "C#", "HLSL", "GLSL", "Lua", "Python", "Git"],
        software: ["Blender", "Maya", "Substance Painter", "Shader Graph", "VFX Graph", "Adobe Creative Suite"],
        soft: ["Problem Solving", "Communication", "Team Management", "Time Management", "English"]
    },
    experience: [
        {
            company: "Gaco Game",
            role: "Lead Technical Artist",
            period: "Mar 2025 - Present",
            description: "Leading technical art direction and pipeline development."
        },
        {
            company: "Gaco Games",
            role: "Visual Effects Artist",
            period: "Sep 2024 - Present",
            description: "VFX implementation and optimization."
        },
        {
            company: "RAXY Dev",
            role: "Technical Artist",
            period: "Jun 2022 - Present",
            description: "Technical art and production support."
        },
        {
            company: "Starpixel",
            role: "Game Developer",
            period: "Sep 2024 - May 2025",
            description: "Game development and mechanics implementation."
        },
        {
            company: "Mintzu Works",
            role: "Visual Effects Artist",
            period: "Oct 2024 - Apr 2025",
            description: "Creating high-impact visual effects for games."
        },
        {
            company: "Immersion Game Development",
            role: "Visual Effects Artist",
            period: "Jul 2024 - Aug 2024",
            description: "Creating game effects using Unity game engine."
        },
        {
            company: "bythen",
            role: "Technical Artist",
            period: "Jun 2024 - Aug 2024",
            description: "Technical art support and shader development."
        },
        {
            company: "Shinta VR",
            role: "Technical Artist",
            period: "Mar 2023 - Jun 2024",
            description: "VR optimization, shader development, and technical art pipeline management."
        },
        {
            company: "Shinta VR",
            role: "Game Programmer",
            period: "Mar 2022 - Mar 2023",
            description: "Gameplay programming and logic implementation."
        }
    ],
    projects: [
        {
            id: "Epic Conquest X - Leon vs Borgol in-game cutscene",
            title: "Leon vs Borgol",
            category: "VFX",
            description: "VFX for in-game cutscene Leon vs Borgol, optimzed for mobile.",
            tech: ["Unity", "HLSL", "Particle System"],
            video: "https://youtu.be/-GBg80E-oPM", // To be filled by user
            image: "assets/thumbnail/Leon vs Borgol.webp",
            link: "https://play.google.com/store/apps/details?id=com.gacogames.epiconx&hl=en"
        },
        {
            id: "stencil-injector",
            title: "Stencil Injector Tool",
            category: "Tools",
            description: "Automated tool to inject stencil buffer commands into Unity ShaderGraph shaders, eliminating manual code editing.",
            tech: ["C#", "Editor Scripting", "ShaderGraph"],
            video: "",
            image: "assets/thumbnail/StencilBuffer.jpg",
            link: "https://github.com/kazama01/UnityShadergraph_StencilSupport"
        },
        {
            id: "cosmize",
            title: "Cosmize Shaders",
            category: "Shaders",
            description: "Created custom shader effects for Degenerate Ape ecosystem. Focused on high-fidelity rendering.",
            tech: ["Unity", "ShaderGraph", "URP"],
            video: "https://youtu.be/qefZ1OFY8nw", // REPLACE WITH YOUR GOOGLE DRIVE LINK
            image: "assets/thumbnail/Cosmize.png",
            link: "https://x.com/cosmize_io"
        },
        {
            id: "brismart",
            title: "BRISMART VFX & Optimization",
            category: "VFX",
            description: "Created UI effects, portal shaders, and environmental VFX. Optimized open-world areas for performance.",
            tech: ["Unity", "VFX Graph", "Particles"],
            video: "https://www.tiktok.com/@pipitfithria/video/7313123205865131270",
            image: "assets/thumbnail/BRISMARTVERSE.jpg",
            link: ""
        },
        {
            id: "kunti-project",
            title: "Kunti Project",
            category: "Game Dev",
            description: "Hack and Slash game development. Implemented core combat mechanics and visual feedback.",
            tech: ["Unity", "C#", "Action"],
            video: "https://www.youtube.com/watch?v=9PnO8-tBU60",
            image: "assets/thumbnail/KuntiProject.webp",
            link: "https://raxydev.itch.io/project-alice"
        },
        {
            id: "crazy-delivery-guy",
            title: "Crazy Delivery Guy",
            category: "Mobile Game",
            description: "Hyper casual game development.",
            tech: ["Unity", "Mobile", "C#"],
            video: "https://youtu.be/vz-VfrfZJAA",
            image: "assets/thumbnail/CrazyDeliveryGuys.webp",
            link: "https://play.google.com/store/apps/details?id=com.RAXYDev.CrazyDeliveryGuy"
        }
    ]
};
