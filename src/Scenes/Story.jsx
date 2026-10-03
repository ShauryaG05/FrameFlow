import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryHUD from "../components/StoryHUD";
import AtmosphereCanvas from "../components/AtmosphereCanvas";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [lightboxImage, setLightboxImage] = useState(null);

    // =====================================================
    // REFS
    // =====================================================

    const sectionRef = useRef(null);
    const scrollHintRef = useRef(null);

    // Memory Box
    const boxRef = useRef(null);
    const lidRef = useRef(null);

    // First Memory
    const photoRef = useRef(null);
    const memoryInfoRef = useRef(null);

    // Chapter 2: Envelope 5 Memory Photos
    const photo2Ref = useRef(null);
    const photo3Ref = useRef(null);
    const photo4Ref = useRef(null);
    const photo5Ref = useRef(null);
    const photo6Ref = useRef(null);

    // Envelope & Letter
    const envelopeRef = useRef(null);
    const envelopeFlapRef = useRef(null);
    const letterRef = useRef(null);

    // Pre-Railway 4-Photo Memory Gallery
    const preRailwayInfoRef = useRef(null);
    const preRailPhoto1Ref = useRef(null);
    const preRailPhoto2Ref = useRef(null);
    const preRailPhoto3Ref = useRef(null);
    const preRailPhoto4Ref = useRef(null);

    // Train Section (Between Envelope & Airplane)
    const trainRef = useRef(null);
    const trainTrackRef = useRef(null);
    const trainSteamRef = useRef(null);
    const trainTextRef = useRef(null);
    const trainSlotInfoRef = useRef(null);
    const trainPhoto1Ref = useRef(null);
    const trainPhoto2Ref = useRef(null);
    const trainPhoto3Ref = useRef(null);
    const trainPhoto4Ref = useRef(null);

    // Chapter 3: Airplane & Post-Flight Memories
    const airplaneRef = useRef(null);
    const cloudsRef = useRef(null);
    const skyTextRef = useRef(null);
    const postPlaneInfoRef = useRef(null);
    const postPhoto1Ref = useRef(null);
    const postPhoto2Ref = useRef(null);
    const postPhoto3Ref = useRef(null);
    const postPhoto4Ref = useRef(null);

    // Chapter 3: Slot 2 (Second 4-Photo Slot)
    const slot2InfoRef = useRef(null);
    const slot2Photo1Ref = useRef(null);
    const slot2Photo2Ref = useRef(null);
    const slot2Photo3Ref = useRef(null);
    const slot2Photo4Ref = useRef(null);

    // Chapter 3: Slot 3 (Third 4-Photo Slot)
    const slot3InfoRef = useRef(null);
    const slot3Photo1Ref = useRef(null);
    const slot3Photo2Ref = useRef(null);
    const slot3Photo3Ref = useRef(null);
    const slot3Photo4Ref = useRef(null);

    // Chapter 3: Slot 4 (Fourth 4-Photo Slot)
    const slot4InfoRef = useRef(null);
    const slot4Photo1Ref = useRef(null);
    const slot4Photo2Ref = useRef(null);
    const slot4Photo3Ref = useRef(null);
    const slot4Photo4Ref = useRef(null);

    // Chapter 5: Slot 5 (Fifth 4-Photo Slot - Celebrations & Family Smiles)
    const slot5InfoRef = useRef(null);
    const slot5Photo1Ref = useRef(null);
    const slot5Photo2Ref = useRef(null);
    const slot5Photo3Ref = useRef(null);
    const slot5Photo4Ref = useRef(null);

    // Traffic Light Section (At the End)
    const trafficLightContainerRef = useRef(null);
    const trafficLightTextRef = useRef(null);
    const redLightRef = useRef(null);
    const yellowLightRef = useRef(null);
    const greenLightRef = useRef(null);
    const signalLabelRef = useRef(null);
    const cakeBtnRef = useRef(null);


    // =====================================================
    // GSAP
    // =====================================================

    // Keyboard arrow and space scroll navigation support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown" || e.key === " ") {
                e.preventDefault();
                window.scrollBy({ top: 350, behavior: "smooth" });
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                window.scrollBy({ top: -350, behavior: "smooth" });
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=29000",
                    scrub: 1.2,
                    pin: true,
                    onUpdate: (self) => {
                        setScrollProgress(self.progress);
                    },
                },
            });

            timeline.to(scrollHintRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
            });

            // =================================================
            // CHAPTER 1
            // MEMORY BOX
            // =================================================


            // 1. Box appears

            timeline.fromTo(
                boxRef.current,
                {
                    scale: 0.7,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                }
            );


            // 2. Lid opens

            timeline.to(lidRef.current, {
                rotationX: -110,
                duration: 2,
                ease: "power2.inOut",
            });


            // 3. Photo comes out of the box
            timeline.fromTo(
                photoRef.current,
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.75,
                    rotation: -3,
                },
                {
                    y: -180,
                    opacity: 1,
                    scale: 0.95,
                    rotation: -3,
                    duration: 1.8,
                    ease: "power2.out",
                }
            );

            // 4. Photo moves toward us
            timeline.to(photoRef.current, {
                scale: 1.25,
                y: -100,
                rotation: 0,
                duration: 1.5,
                ease: "power2.inOut",
            });

            // 5. Photo becomes the main scene (Balanced, natural scale)
            timeline.to(photoRef.current, {
                scale: 1.55,
                y: -40,
                rotation: 0,
                duration: 2,
                ease: "power2.inOut",
            });

            // 6. Box disappears while photo reaches final size
            timeline.to(
                boxRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                    duration: 1,
                },
                "<"
            );

            // 7. HOLD PHOTO AT FINAL SIZE
            timeline.to({}, {
                duration: 2,
            });

            // 8. Memory information appears
            timeline.to(memoryInfoRef.current, {
                opacity: 1,
                y: -20,
                duration: 1.5,
            });

            // 9. Background becomes darker
            timeline.to(sectionRef.current, {
                backgroundColor: "#1c1917",
                color: "#f5f5f4",
                duration: 2,
            });

            // 10. HOLD THE MEMORY
            timeline.to({}, {
                duration: 2,
            });

            // =================================================
            // TRANSITION TO CHAPTER 2
            // =================================================

            // 11. Photo leaves gracefully
            timeline.to(photoRef.current, {
                scale: 2.1,
                opacity: 0,
                y: -120,
                duration: 1.8,
                ease: "power2.inOut",
            });

            // 12. Memory text leaves
            timeline.to(
                memoryInfoRef.current,
                {
                    opacity: 0,
                    y: -60,
                    duration: 1,
                },
                "<"
            );


            // =================================================
            // CHAPTER 2: ENVELOPE
            // =================================================

            // 13. Envelope appears
            timeline.fromTo(
                envelopeRef.current,
                {
                    opacity: 0,
                    scale: 0.7,
                    y: 80,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                }
            );

            // 14. Envelope flap opens
            timeline.to(envelopeFlapRef.current, {
                rotationX: -170,
                duration: 1.2,
                ease: "power2.inOut",
            });

            // 15. Letter comes out
            timeline.to(letterRef.current, {
                y: -100,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
            });

            // 16. Envelope and letter fade out to make room for photos
            timeline.to([envelopeRef.current, letterRef.current], {
                opacity: 0,
                scale: 0.85,
                y: -40,
                duration: 1,
                ease: "power2.inOut",
            });

            // =================================================
            // 5 MEMORY PHOTOS POP OUT OF ENVELOPE
            // =================================================

            timeline.fromTo(
                [photo2Ref.current, photo3Ref.current, photo4Ref.current, photo5Ref.current, photo6Ref.current],
                {
                    opacity: 0,
                    scale: 0.2,
                    x: 0,
                    y: 60,
                    rotation: 0,
                },
                {
                    opacity: 1,
                    scale: 1,
                    x: (i) => [-580, -290, 0, 290, 580][i],
                    y: (i) => [-10, 0, 0, 0, -10][i],
                    rotation: (i) => [-6, -3, 0, 3, 6][i],
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );

            // Hold so user can enjoy the 5 envelope photos with a comfortable pause
            timeline.to({}, { duration: 2 });

            // 5 envelope photos glide up and exit smoothly
            timeline.to(
                [photo2Ref.current, photo3Ref.current, photo4Ref.current, photo5Ref.current, photo6Ref.current],
                {
                    opacity: 0,
                    y: -100,
                    scale: 0.82,
                    duration: 1.4,
                    stagger: 0.06,
                    ease: "power1.inOut",
                }
            );

            // =================================================
            // NEW PRE-RAILWAY 4-PHOTO GALLERY (GOLDEN MEMORIES)
            // =================================================

            // Pre-railway gallery title appears
            timeline.to(preRailwayInfoRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            });

            // 4 Photos pop onto screen with Photo 1 in FOCUS
            timeline.fromTo(
                preRailPhoto1Ref.current,
                { opacity: 0, scale: 0.4, y: 80 },
                { opacity: 1, scale: 1.28, x: -480, y: 0, rotation: -4, zIndex: 60, duration: 1.4, ease: "power2.out" },
                "<+=0.1"
            );
            timeline.fromTo(
                [preRailPhoto2Ref.current, preRailPhoto3Ref.current, preRailPhoto4Ref.current],
                { opacity: 0, scale: 0.4, y: 80 },
                {
                    opacity: 0.55,
                    scale: 0.92,
                    x: (i) => [-160, 160, 480][i],
                    y: 0,
                    rotation: (i) => [-2, 2, 4][i],
                    zIndex: 40,
                    duration: 1.4,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "<"
            );

            // Hold Photo 1 Focus
            timeline.to({}, { duration: 1 });

            // Focus Shift 1 -> 2
            timeline.to(preRailPhoto1Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(preRailPhoto2Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Focus Shift 2 -> 3
            timeline.to(preRailPhoto2Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(preRailPhoto3Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Focus Shift 3 -> 4
            timeline.to(preRailPhoto3Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(preRailPhoto4Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1.5 });

            // Pre-railway photos & title glide up and exit before railway track emerges
            timeline.to(
                [preRailPhoto1Ref.current, preRailPhoto2Ref.current, preRailPhoto3Ref.current, preRailPhoto4Ref.current],
                { opacity: 0, y: -100, scale: 0.82, duration: 1.4, stagger: 0.05, ease: "power1.inOut" }
            );
            timeline.to(preRailwayInfoRef.current, { opacity: 0, y: -30, duration: 1, ease: "power1.inOut" }, "<");

            // =================================================
            // TRAIN JOURNEY SECTION (BEFORE AIRPLANE)
            // =================================================

            // Background transitions to twilight railway night
            timeline.to(sectionRef.current, {
                backgroundColor: "#111827",
                color: "#f3f4f6",
                duration: 1.5,
            });

            // Train track and railway title emerge
            timeline.to([trainTrackRef.current, trainTextRef.current], {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
            }, "<");

            // Train chugs smoothly across the railway from left to right
            timeline.fromTo(
                trainRef.current,
                {
                    opacity: 1,
                    x: "-120vw",
                },
                {
                    opacity: 1,
                    x: "120vw",
                    duration: 5.5,
                    ease: "power1.inOut",
                },
                "<+=0.2"
            );

            // Steam puffs drift and expand behind the smokestack
            timeline.fromTo(
                trainSteamRef.current,
                {
                    opacity: 0,
                    scale: 0.5,
                    x: -20,
                },
                {
                    opacity: 0.9,
                    scale: 1.4,
                    x: -120,
                    duration: 4.5,
                    ease: "none",
                },
                "<+=0.4"
            );

            // Train title, track and steam fade out as train departs
            timeline.to(
                [trainTextRef.current, trainTrackRef.current, trainSteamRef.current],
                {
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.inOut",
                },
                ">-1.2"
            );

            // =================================================
            // RAILWAY PHOTO SLOT (AFTER TRAIN EXITS)
            // =================================================

            // Railway photo slot title appears
            timeline.to(trainSlotInfoRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            });

            // Train photos pop onto screen with Photo 1 in FOCUS
            timeline.fromTo(
                trainPhoto1Ref.current,
                { opacity: 0, scale: 0.4, y: 80 },
                { opacity: 1, scale: 1.28, x: -480, y: 0, rotation: -4, zIndex: 60, duration: 1.4, ease: "power2.out" },
                "<+=0.1"
            );
            timeline.fromTo(
                [trainPhoto2Ref.current, trainPhoto3Ref.current, trainPhoto4Ref.current],
                { opacity: 0, scale: 0.4, y: 80 },
                {
                    opacity: 0.55,
                    scale: 0.92,
                    x: (i) => [-160, 160, 480][i],
                    y: 0,
                    rotation: (i) => [-2, 2, 4][i],
                    zIndex: 40,
                    duration: 1.4,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "<"
            );

            // Hold Photo 1 Focus
            timeline.to({}, { duration: 1 });

            // Focus Shift 1 -> 2
            timeline.to(trainPhoto1Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(trainPhoto2Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Focus Shift 2 -> 3
            timeline.to(trainPhoto2Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(trainPhoto3Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Focus Shift 3 -> 4
            timeline.to(trainPhoto3Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(trainPhoto4Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Railway Photo Slot exits smoothly before Airplane sky begins
            timeline.to(
                [trainPhoto1Ref.current, trainPhoto2Ref.current, trainPhoto3Ref.current, trainPhoto4Ref.current],
                { opacity: 0, y: -100, scale: 0.82, duration: 1.4, stagger: 0.05, ease: "power1.inOut" }
            );
            timeline.to(trainSlotInfoRef.current, { opacity: 0, y: -30, duration: 1, ease: "power1.inOut" }, "<");

            // =================================================
            // AIRPLANE PASS 1: CLIMBING ACROSS THE SCENE
            // =================================================

            // Background transitions smoothly to sky
            timeline.to(sectionRef.current, {
                backgroundColor: "#0c1322",
                color: "#f8fafc",
                duration: 2,
            });

            // Clouds drift in
            timeline.to(cloudsRef.current, {
                opacity: 1,
                x: -180,
                duration: 3.5,
                ease: "none",
            }, "<");

            // Airplane Pass 1: Enters from bottom-left and ascends to top-right
            timeline.fromTo(
                airplaneRef.current,
                {
                    opacity: 1,
                    x: "-100vw",
                    y: "35vh",
                    scale: 0.75,
                    rotation: -20,
                },
                {
                    opacity: 1,
                    x: "-10vw",
                    y: "0vh",
                    scale: 1.15,
                    rotation: -14,
                    duration: 2.5,
                    ease: "power1.out",
                },
                "<"
            );

            // Airplane completes Pass 1 and exits top-right
            timeline.to(airplaneRef.current, {
                x: "100vw",
                y: "-35vh",
                scale: 1.3,
                rotation: -8,
                duration: 2.5,
                ease: "power1.in",
            });

            // Sky text appears briefly between passes
            timeline.to(skyTextRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out",
            });

            // Clouds reposition and drift in the opposite direction
            timeline.to(cloudsRef.current, {
                x: 100,
                duration: 3,
                ease: "none",
            }, "<");

            // =================================================
            // AIRPLANE PASS 2: 2ND ENTRANCE / LOW CRUISE SWOOP
            // =================================================

            // Airplane enters 2nd time from top-left, banking lower and grander
            timeline.fromTo(
                airplaneRef.current,
                {
                    opacity: 1,
                    x: "-100vw",
                    y: "-15vh",
                    scale: 1.3,
                    rotation: 12,
                },
                {
                    opacity: 1,
                    x: "0vw",
                    y: "10vh",
                    scale: 1.55,
                    rotation: 4,
                    duration: 2.8,
                    ease: "power1.inOut",
                }
            );

            // Sky text fades as plane swoops across
            timeline.to(skyTextRef.current, {
                opacity: 0,
                y: -40,
                duration: 1,
            }, "<");

            // Airplane zooms upward and exits off right screen
            timeline.to(airplaneRef.current, {
                x: "100vw",
                y: "-25vh",
                scale: 1.4,
                rotation: -12,
                duration: 2.5,
                ease: "power1.in",
            });

            // Clouds fade as airplane exits 2nd time
            timeline.to(cloudsRef.current, {
                opacity: 0,
                duration: 1.5,
            }, ">-1");

            // Background shifts to warm dark gallery
            timeline.to(sectionRef.current, {
                backgroundColor: "#18181b",
                color: "#f5f5f4",
                duration: 1.2,
            });

            // =================================================
            // SLOT 1: IMAGES POP IN + SILKY SMOOTH FOCUS SHIFT
            // =================================================

            // Post-airplane title appears
            timeline.to(postPlaneInfoRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            });

            // Photos pop in smoothly with Photo 1 initially in FOCUS
            timeline.fromTo(
                postPhoto1Ref.current,
                { opacity: 0, scale: 0.4, y: 80 },
                { opacity: 1, scale: 1.28, x: -480, y: 0, rotation: -4, zIndex: 60, duration: 1.4, ease: "power2.out" },
                "<+=0.1"
            );
            timeline.fromTo(
                [postPhoto2Ref.current, postPhoto3Ref.current, postPhoto4Ref.current],
                { opacity: 0, scale: 0.4, y: 80 },
                {
                    opacity: 0.55,
                    scale: 0.92,
                    x: (i) => [-160, 160, 480][i],
                    y: 0,
                    rotation: (i) => [-2, 2, 4][i],
                    zIndex: 40,
                    duration: 1.4,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "<"
            );

            // Hold Photo 1 Focus
            timeline.to({}, { duration: 1 });

            // Focus Shift 1 -> 2
            timeline.to(postPhoto1Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(postPhoto2Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Focus Shift 2 -> 3
            timeline.to(postPhoto2Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(postPhoto3Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Focus Shift 3 -> 4
            timeline.to(postPhoto3Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(postPhoto4Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });


            // =================================================
            // TRANSITION TO SLOT 2
            // =================================================

            // Slot 1 glides up gently
            timeline.to(
                [postPhoto1Ref.current, postPhoto2Ref.current, postPhoto3Ref.current, postPhoto4Ref.current],
                { opacity: 0, y: -100, scale: 0.82, duration: 1.4, stagger: 0.05, ease: "power1.inOut" }
            );
            timeline.to(postPlaneInfoRef.current, { opacity: 0, y: -30, duration: 1, ease: "power1.inOut" }, "<");

            // Slot 2 title appears
            timeline.to(slot2InfoRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "<+=0.3");

            // Slot 2 Photos pop in with Photo 1 in FOCUS
            timeline.fromTo(
                slot2Photo1Ref.current,
                { opacity: 0, scale: 0.4, y: 80 },
                { opacity: 1, scale: 1.28, x: -480, y: 0, rotation: 4, zIndex: 60, duration: 1.4, ease: "power2.out" },
                "<"
            );
            timeline.fromTo(
                [slot2Photo2Ref.current, slot2Photo3Ref.current, slot2Photo4Ref.current],
                { opacity: 0, scale: 0.4, y: 80 },
                {
                    opacity: 0.55,
                    scale: 0.92,
                    x: (i) => [-160, 160, 480][i],
                    y: 0,
                    rotation: (i) => [-2, 2, -4][i],
                    zIndex: 40,
                    duration: 1.4,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "<"
            );

            // Hold Photo 1 Focus
            timeline.to({}, { duration: 1 });

            // Slot 2 Focus Shift 1 -> 2
            timeline.to(slot2Photo1Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot2Photo2Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Slot 2 Focus Shift 2 -> 3
            timeline.to(slot2Photo2Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot2Photo3Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Slot 2 Focus Shift 3 -> 4
            timeline.to(slot2Photo3Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot2Photo4Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });


            // =================================================
            // TRANSITION TO SLOT 3
            // =================================================

            // Slot 2 glides up gently
            timeline.to(
                [slot2Photo1Ref.current, slot2Photo2Ref.current, slot2Photo3Ref.current, slot2Photo4Ref.current],
                { opacity: 0, y: -100, scale: 0.82, duration: 1.4, stagger: 0.05, ease: "power1.inOut" }
            );
            timeline.to(slot2InfoRef.current, { opacity: 0, y: -30, duration: 1, ease: "power1.inOut" }, "<");

            // Slot 3 title appears
            timeline.to(slot3InfoRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "<+=0.3");

            // Slot 3 Photos pop in with Photo 1 in FOCUS
            timeline.fromTo(
                slot3Photo1Ref.current,
                { opacity: 0, scale: 0.4, y: 80 },
                { opacity: 1, scale: 1.28, x: -480, y: 0, rotation: -4, zIndex: 60, duration: 1.4, ease: "power2.out" },
                "<"
            );
            timeline.fromTo(
                [slot3Photo2Ref.current, slot3Photo3Ref.current, slot3Photo4Ref.current],
                { opacity: 0, scale: 0.4, y: 80 },
                {
                    opacity: 0.55,
                    scale: 0.92,
                    x: (i) => [-160, 160, 480][i],
                    y: 0,
                    rotation: (i) => [2, -2, 4][i],
                    zIndex: 40,
                    duration: 1.4,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "<"
            );

            // Hold Photo 1 Focus
            timeline.to({}, { duration: 1 });

            // Slot 3 Focus Shift 1 -> 2
            timeline.to(slot3Photo1Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot3Photo2Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Slot 3 Focus Shift 2 -> 3
            timeline.to(slot3Photo2Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot3Photo3Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Slot 3 Focus Shift 3 -> 4
            timeline.to(slot3Photo3Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot3Photo4Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });


            // =================================================
            // TRANSITION TO SLOT 4
            // =================================================

            // Slot 3 glides up gently
            timeline.to(
                [slot3Photo1Ref.current, slot3Photo2Ref.current, slot3Photo3Ref.current, slot3Photo4Ref.current],
                { opacity: 0, y: -100, scale: 0.82, duration: 1.4, stagger: 0.05, ease: "power1.inOut" }
            );
            timeline.to(slot3InfoRef.current, { opacity: 0, y: -30, duration: 1, ease: "power1.inOut" }, "<");

            // Slot 4 title appears
            timeline.to(slot4InfoRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "<+=0.3");

            // Slot 4 Photos pop in with Photo 1 in FOCUS
            timeline.fromTo(
                slot4Photo1Ref.current,
                { opacity: 0, scale: 0.4, y: 80 },
                { opacity: 1, scale: 1.28, x: -480, y: 0, rotation: 3, zIndex: 60, duration: 1.4, ease: "power2.out" },
                "<"
            );
            timeline.fromTo(
                [slot4Photo2Ref.current, slot4Photo3Ref.current, slot4Photo4Ref.current],
                { opacity: 0, scale: 0.4, y: 80 },
                {
                    opacity: 0.55,
                    scale: 0.92,
                    x: (i) => [-160, 160, 480][i],
                    y: 0,
                    rotation: (i) => [-2, 2, -3][i],
                    zIndex: 40,
                    duration: 1.4,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "<"
            );

            // Hold Photo 1 Focus
            timeline.to({}, { duration: 1 });

            // Slot 4 Focus Shift 1 -> 2
            timeline.to(slot4Photo1Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot4Photo2Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Slot 4 Focus Shift 2 -> 3
            timeline.to(slot4Photo2Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot4Photo3Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Slot 4 Focus Shift 3 -> 4
            timeline.to(slot4Photo3Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot4Photo4Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1.5 });

            // =================================================
            // TRANSITION TO SLOT 5 (CELEBRATIONS & FAMILY SMILES)
            // =================================================

            // Slot 4 glides up gently
            timeline.to(
                [slot4Photo1Ref.current, slot4Photo2Ref.current, slot4Photo3Ref.current, slot4Photo4Ref.current],
                { opacity: 0, y: -100, scale: 0.82, duration: 1.4, stagger: 0.05, ease: "power1.inOut" }
            );
            timeline.to(slot4InfoRef.current, { opacity: 0, y: -30, duration: 1, ease: "power1.inOut" }, "<");

            // Slot 5 title appears
            timeline.to(slot5InfoRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "<+=0.3");

            // Slot 5 Photos pop in with Photo 1 in FOCUS
            timeline.fromTo(
                slot5Photo1Ref.current,
                { opacity: 0, scale: 0.4, y: 80 },
                { opacity: 1, scale: 1.28, x: -480, y: 0, rotation: -3, zIndex: 60, duration: 1.4, ease: "power2.out" },
                "<"
            );
            timeline.fromTo(
                [slot5Photo2Ref.current, slot5Photo3Ref.current, slot5Photo4Ref.current],
                { opacity: 0, scale: 0.4, y: 80 },
                {
                    opacity: 0.55,
                    scale: 0.92,
                    x: (i) => [-160, 160, 480][i],
                    y: 0,
                    rotation: (i) => [-2, 2, 3][i],
                    zIndex: 40,
                    duration: 1.4,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "<"
            );

            // Hold Photo 1 Focus
            timeline.to({}, { duration: 1 });

            // Slot 5 Focus Shift 1 -> 2
            timeline.to(slot5Photo1Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot5Photo2Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Slot 5 Focus Shift 2 -> 3
            timeline.to(slot5Photo2Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot5Photo3Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1 });

            // Slot 5 Focus Shift 3 -> 4
            timeline.to(slot5Photo3Ref.current, { scale: 0.92, opacity: 0.55, zIndex: 40, duration: 1.4, ease: "sine.inOut" });
            timeline.to(slot5Photo4Ref.current, { scale: 1.28, opacity: 1, zIndex: 60, duration: 1.4, ease: "sine.inOut" }, "<");
            timeline.to({}, { duration: 1.5 });

            // =================================================
            // TRAFFIC LIGHT ANIMATION (FINAL END SLOT)
            // =================================================

            // Slot 5 photos and title glide up and exit on scroll
            timeline.to(
                [slot5Photo1Ref.current, slot5Photo2Ref.current, slot5Photo3Ref.current, slot5Photo4Ref.current],
                { opacity: 0, y: -100, scale: 0.82, duration: 1.4, stagger: 0.05, ease: "power1.inOut" }
            );
            timeline.to(slot5InfoRef.current, { opacity: 0, y: -30, duration: 1, ease: "power1.inOut" }, "<");

            // Background shifts to sleek midnight boulevard
            timeline.to(sectionRef.current, {
                backgroundColor: "#09090b",
                color: "#f4f4f5",
                duration: 1.5,
            });

            // Traffic Light and Title descend smoothly into center
            timeline.to(
                [trafficLightContainerRef.current, trafficLightTextRef.current],
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                },
                "<+=0.2"
            );

            // 1. RED LIGHT ON (Stop to cherish)
            timeline.to(redLightRef.current, {
                opacity: 1,
                scale: 1.1,
                boxShadow: "0 0 45px rgba(239, 68, 68, 0.95)",
                duration: 1,
                ease: "power2.out",
            });
            timeline.to(signalLabelRef.current, {
                innerText: "STOP — Pause to cherish every precious memory",
                color: "#ef4444",
                duration: 0.5,
            }, "<");

            // Hold Red Light
            timeline.to({}, { duration: 1.8 });

            // 2. RED TURNS OFF -> YELLOW LIGHT TURNS ON (Get ready)
            timeline.to(redLightRef.current, {
                opacity: 0.2,
                scale: 1,
                boxShadow: "none",
                duration: 0.8,
                ease: "power2.inOut",
            });
            timeline.to(yellowLightRef.current, {
                opacity: 1,
                scale: 1.1,
                boxShadow: "0 0 45px rgba(245, 158, 11, 0.95)",
                duration: 0.8,
                ease: "power2.inOut",
            }, "<");
            timeline.to(signalLabelRef.current, {
                innerText: "READY — For brand new adventures and dreams",
                color: "#f59e0b",
                duration: 0.5,
            }, "<");

            // Hold Yellow Light
            timeline.to({}, { duration: 1.8 });

            // 3. YELLOW TURNS OFF -> GREEN LIGHT TURNS ON (Go! Full speed ahead)
            timeline.to(yellowLightRef.current, {
                opacity: 0.2,
                scale: 1,
                boxShadow: "none",
                duration: 0.8,
                ease: "power2.inOut",
            });
            timeline.to(greenLightRef.current, {
                opacity: 1,
                scale: 1.2,
                boxShadow: "0 0 60px rgba(16, 185, 129, 1)",
                duration: 1,
                ease: "back.out(1.5)",
            }, "<");
            timeline.to(signalLabelRef.current, {
                innerText: "GO — Full speed ahead into an extraordinary year!",
                color: "#10b981",
                duration: 0.5,
            }, "<");

            // Reveal Birthday Cake Grand Finale button
            timeline.to(cakeBtnRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.7)",
            });

            // Final celebration hold on Green Light
            timeline.to({}, {
                duration: 3,
            });


        }, sectionRef);


        // Cleanup

        return () => ctx.revert();

    }, []);


    // =====================================================
    // JSX
    // =====================================================

    return (
        <main className="bg-[#f4f0e8] text-neutral-900 transition-colors duration-1000">

            {/* FLOATING HUD & CHAPTER CONTROLS */}
            <StoryHUD scrollProgress={scrollProgress} />

            {/* ATMOSPHERIC PARTICLES */}
            <AtmosphereCanvas />

            <section
                ref={sectionRef}
                className="
                    relative
                    h-screen
                    overflow-hidden
                    perspective-distant
                "
            >

                {/* SCROLL HINT */}
                <div
                    ref={scrollHintRef}
                    className="
                        absolute
                        bottom-24
                        left-1/2
                        z-100
                        -translate-x-1/2
                        text-center
                        pointer-events-none
                    "
                >
                    <div className="rounded-full border border-stone-400/40 bg-stone-900/10 px-5 py-2 backdrop-blur-xs">
                        <p className="text-[11px] uppercase tracking-[0.45em] text-stone-600 font-medium">
                            Scroll to Travel
                        </p>
                    </div>

                    <div className="mx-auto mt-3 h-10 w-px bg-linear-to-b from-stone-400 to-transparent">
                        <div className="h-3 w-px bg-amber-600 animate-bounce" />
                    </div>
                </div>

                <div className="relative flex h-screen items-center justify-center">


                    {/* =================================================
                        MEMORY BOX
                    ================================================= */}

                    <div
                        ref={boxRef}
                        className="
                            relative
                            h-64
                            w-80
                        "
                    >

                        {/* BOX BODY */}

                        <div
                            className="
                                absolute
                                bottom-0
                                z-10
                                h-48
                                w-full
                                rounded-b-xl
                                bg-[#8b5e3c]
                                shadow-[0_25px_60px_rgba(0,0,0,0.25)]
                            "
                        />


                        {/* BOX LID */}

                        <div
                            ref={lidRef}
                            className="
                                absolute
                                top-0
                                z-30
                                h-16
                                w-full
                                rounded-t-xl
                                bg-[#a87348]
                                shadow-lg
                                origin-bottom
                                transform-3d
                            "
                        />

                    </div>


                    {/* =================================================
                        CHILDHOOD PHOTO
                        
                        IMPORTANT:
                        This is OUTSIDE boxRef.
                    ================================================= */}

                    <div
                        ref={photoRef}
                        onClick={() => setLightboxImage({ src: "/images/Main.jpg", title: "Where It All Began", desc: "The pure beginnings of an extraordinary life journey filled with warmth and dreams." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-52
                            sm:w-60
                            md:w-68
                            max-w-[85vw]
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                w-full
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                sm:p-3
                                shadow-[0_30px_80px_rgba(0,0,0,0.4)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/Main.jpg"
                                alt="Where It All Began - Early Memories"
                                className="
                                    h-full
                                    w-full
                                    rounded-xs
                                    object-cover
                                    object-center
                                "
                            />
                        </div>
                    </div>


                    {/* =================================================
                        MEMORY INFORMATION
                    ================================================= */}

                    <div
                        ref={memoryInfoRef}
                        className="
                            pointer-events-none
                            absolute
                            bottom-20
                            left-1/2
                            z-50
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >

                        <p className="
                            text-sm
                            uppercase
                            tracking-[0.4em]
                            text-stone-400
                        ">
                            1977
                        </p>

                        <h2 className="
                            mt-3
                            text-4xl
                            font-semibold
                        ">
                            Where it all began
                        </h2>

                        <p className="
                            mx-auto
                            mt-3
                            max-w-md
                            text-stone-400
                        ">
                            The beginning of a life filled with little moments.
                        </p>

                    </div>


                    {/* =================================================
                        ENVELOPE
                    ================================================= */}

                    <div
                        ref={envelopeRef}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-72
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                        "
                    >

                        <div
                            className="
                                relative
                                aspect-[1.6/1]
                                overflow-hidden
                                rounded-md
                                bg-[#e8dcc8]
                                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                            "
                        >

                            {/* =================================================
                                LETTER
                            ================================================= */}

                            <div
                                ref={letterRef}
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    z-10
                                    w-56
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    bg-[#faf7ef]
                                    p-6
                                    shadow-xl
                                    opacity-0
                                "
                            >

                                <p className="
                                    text-xs
                                    uppercase
                                    tracking-[0.3em]
                                    text-stone-400
                                ">
                                    1985
                                </p>

                                <p className="
                                    mt-4
                                    font-serif
                                    text-lg
                                    leading-relaxed
                                    text-stone-700
                                ">
                                </p>

                            </div>


                            {/* =================================================
                                ENVELOPE FLAP
                            ================================================= */}

                            <div
                                ref={envelopeFlapRef}
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    z-20
                                    h-1/2
                                    w-full
                                    bg-[#d8c8ae]
                                    [clip-path:polygon(0_0,100%_0,50%_100%)]
                                    origin-top
                                    transform-3d
                                "
                            />

                        </div>

                    </div>


                    {/* =================================================
                        MEMORY PHOTOS (CHAPTER 2 - 5 ENVELOPE PHOTOS)
                    ================================================= */}

                    {/* PHOTO 1 (Far Left) */}
                    <div
                        ref={photo2Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/one.jpg", title: "Innocent Beginnings", desc: "A cherished look back at early days filled with innocence and wonder." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/one.jpg"
                                alt="Innocent Beginnings"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* PHOTO 2 (Mid Left) */}
                    <div
                        ref={photo3Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/two.jpg", title: "Treasured Family Roots", desc: "A timeless memory of deep love and family warmth." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/two.jpg"
                                alt="Treasured Family Roots"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* PHOTO 3 (Center) */}
                    <div
                        ref={photo4Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/three.JPG", title: "Endless Warmth & Love", desc: "A radiant and gentle smile that brightens every room." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/three.JPG"
                                alt="Endless Warmth & Love"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* PHOTO 4 (Mid Right) */}
                    <div
                        ref={photo5Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/four.JPG", title: "Wisdom & Grace", desc: "Always leading the family with strength, love, and care." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/four.JPG"
                                alt="Wisdom & Grace"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* PHOTO 5 (Far Right) */}
                    <div
                        ref={photo6Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/five.JPG", title: "Always Our Hero", desc: "A pillar of support, inspiration, and kindness." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/five.JPG"
                                alt="Always Our Hero"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* =================================================
                        NEW PRE-RAILWAY 4-PHOTO GALLERY
                    ================================================= */}

                    {/* PRE-RAILWAY GALLERY TITLE */}
                    <div
                        ref={preRailwayInfoRef}
                        className="
                            pointer-events-none
                            absolute
                            top-16
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-amber-400">
                            Golden Memories
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-stone-100">
                            A thousand moments, frozen in time
                        </h2>
                    </div>

                    {/* PRE-RAILWAY PHOTO 1 (Far Left) */}
                    <div
                        ref={preRailPhoto1Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/six.JPG", title: "Platform Reverie", desc: "Cherished memories of vintage times and the warmth of family companionship." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/six.JPG"
                                alt="Platform Reverie"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* PRE-RAILWAY PHOTO 2 (Mid Left) */}
                    <div
                        ref={preRailPhoto2Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/seven.JPG", title: "Tracks of Destiny", desc: "Stepping boldly into new chapters with courage, dignity, and a smile." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/seven.JPG"
                                alt="Tracks of Destiny"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* PRE-RAILWAY PHOTO 3 (Mid Right) */}
                    <div
                        ref={preRailPhoto3Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/Eigth.JPG", title: "Peaceful Smiles", desc: "A tranquil moment captured with pure happiness and contentment." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/Eigth.JPG"
                                alt="Peaceful Smiles"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* PRE-RAILWAY PHOTO 4 (Far Right) */}
                    <div
                        ref={preRailPhoto4Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/child/nine.JPG", title: "Family Festive Delight", desc: "Bright laughter and timeless festive joy celebrated together." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div
                            className="
                                aspect-4/5
                                overflow-hidden
                                rounded-md
                                bg-white
                                p-2.5
                                md:p-3
                                shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                                transition-transform duration-300 group-hover:scale-105
                            "
                        >
                            <img
                                src="/images/papa/child/nine.JPG"
                                alt="Family Festive Delight"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>


                    {/* =================================================
                        TRAIN JOURNEY SECTION (BEFORE AIRPLANE)
                    ================================================= */}

                    {/* TRAIN TITLE */}
                    <div
                        ref={trainTextRef}
                        className="
                            pointer-events-none
                            absolute
                            top-20
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-amber-400">
                            Journeys & Tracks
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-light tracking-wide text-stone-100">
                            Rolling Through Memories
                        </h2>
                    </div>

                    {/* RAILWAY TRACK */}
                    <div
                        ref={trainTrackRef}
                        className="
                            pointer-events-none
                            absolute
                            bottom-28
                            left-0
                            w-full
                            z-25
                            opacity-0
                        "
                    >
                        {/* Steel Rails */}
                        <div className="relative h-2 w-full bg-linear-to-r from-stone-600 via-stone-400 to-stone-600 shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                            {/* Railroad Sleepers/Ties */}
                            <div className="absolute -top-1 inset-x-0 flex justify-between gap-3 px-4">
                                {Array.from({ length: 40 }).map((_, idx) => (
                                    <div key={idx} className="h-4 w-2 rounded-xs bg-amber-950/80 shadow-xs" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* TRAIN & STEAM */}
                    <div
                        ref={trainRef}
                        className="
                            pointer-events-none
                            absolute
                            bottom-28
                            left-1/2
                            z-35
                            -translate-x-1/2
                            opacity-0
                        "
                    >
                        <div className="relative flex items-end">
                            {/* Steam Smoke Puffs */}
                            <div
                                ref={trainSteamRef}
                                className="absolute -top-16 left-28 flex items-center gap-3 opacity-0 pointer-events-none"
                            >
                                <div className="h-8 w-8 rounded-full bg-white/30 blur-md" />
                                <div className="h-12 w-12 rounded-full bg-white/20 blur-lg" />
                                <div className="h-16 w-16 rounded-full bg-white/10 blur-xl" />
                            </div>

                            {/* Detailed Locomotive & Coach SVG */}
                            <svg
                                viewBox="0 0 520 120"
                                className="w-lg md:w-176 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Headlight Beam */}
                                <polygon
                                    points="510,75 580,45 580,105 510,75"
                                    fill="url(#trainHeadlightGradient)"
                                    opacity="0.6"
                                />

                                <defs>
                                    <linearGradient id="trainHeadlightGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="trainCoachGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#1e293b" />
                                        <stop offset="100%" stopColor="#0f172a" />
                                    </linearGradient>
                                    <linearGradient id="trainEngineGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#b45309" />
                                        <stop offset="100%" stopColor="#78350f" />
                                    </linearGradient>
                                </defs>

                                {/* COACH 1 (Rear Passenger Coach) */}
                                <rect x="10" y="35" width="160" height="55" rx="6" fill="url(#trainCoachGrad)" stroke="#475569" strokeWidth="2" />
                                {/* Coach Roof */}
                                <rect x="6" y="30" width="168" height="8" rx="3" fill="#334155" />
                                {/* Coach Windows */}
                                <rect x="25" y="45" width="22" height="18" rx="3" fill="#fef08a" opacity="0.9" />
                                <rect x="55" y="45" width="22" height="18" rx="3" fill="#fef08a" opacity="0.9" />
                                <rect x="85" y="45" width="22" height="18" rx="3" fill="#fef08a" opacity="0.9" />
                                <rect x="115" y="45" width="22" height="18" rx="3" fill="#fef08a" opacity="0.9" />
                                <rect x="145" y="45" width="15" height="18" rx="2" fill="#fef08a" opacity="0.9" />
                                {/* Coach Stripe */}
                                <rect x="10" y="70" width="160" height="4" fill="#fbbf24" />

                                {/* Coupler Link */}
                                <rect x="170" y="72" width="20" height="6" rx="2" fill="#64748b" />

                                {/* COACH 2 (Middle Coach) */}
                                <rect x="190" y="35" width="150" height="55" rx="6" fill="url(#trainCoachGrad)" stroke="#475569" strokeWidth="2" />
                                <rect x="186" y="30" width="158" height="8" rx="3" fill="#334155" />
                                <rect x="205" y="45" width="22" height="18" rx="3" fill="#fef08a" opacity="0.9" />
                                <rect x="235" y="45" width="22" height="18" rx="3" fill="#fef08a" opacity="0.9" />
                                <rect x="265" y="45" width="22" height="18" rx="3" fill="#fef08a" opacity="0.9" />
                                <rect x="295" y="45" width="22" height="18" rx="3" fill="#fef08a" opacity="0.9" />
                                <rect x="190" y="70" width="150" height="4" fill="#fbbf24" />

                                {/* Coupler Link */}
                                <rect x="340" y="72" width="20" height="6" rx="2" fill="#64748b" />

                                {/* LOCOMOTIVE ENGINE */}
                                {/* Cabin */}
                                <rect x="360" y="25" width="60" height="65" rx="4" fill="url(#trainEngineGrad)" stroke="#92400e" strokeWidth="2" />
                                <rect x="356" y="20" width="68" height="7" rx="3" fill="#451a03" />
                                {/* Cabin Window */}
                                <rect x="375" y="34" width="30" height="22" rx="3" fill="#bae6fd" opacity="0.9" />
                                {/* Boiler Body */}
                                <rect x="420" y="42" width="90" height="48" rx="6" fill="url(#trainEngineGrad)" stroke="#92400e" strokeWidth="2" />
                                {/* Smokestack Chimney */}
                                <path d="M445 42 L442 22 L458 22 L455 42 Z" fill="#1e293b" />
                                <ellipse cx="450" cy="22" rx="9" ry="3" fill="#475569" />
                                {/* Steam Dome */}
                                <ellipse cx="480" cy="40" rx="8" ry="6" fill="#f59e0b" />
                                {/* Headlight Housing */}
                                <rect x="508" y="65" width="10" height="16" rx="3" fill="#f59e0b" />
                                <circle cx="515" cy="73" r="6" fill="#fef08a" />
                                {/* Cowcatcher / Pilot Grill */}
                                <polygon points="505,88 522,96 505,96" fill="#475569" />

                                {/* WHEELS (Coach 1) */}
                                <circle cx="35" cy="98" r="11" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="65" cy="98" r="11" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="115" cy="98" r="11" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="145" cy="98" r="11" fill="#334155" stroke="#94a3b8" strokeWidth="2" />

                                {/* WHEELS (Coach 2) */}
                                <circle cx="215" cy="98" r="11" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="245" cy="98" r="11" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="285" cy="98" r="11" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="315" cy="98" r="11" fill="#334155" stroke="#94a3b8" strokeWidth="2" />

                                {/* WHEELS (Locomotive) */}
                                <circle cx="380" cy="96" r="13" fill="#78350f" stroke="#fbbf24" strokeWidth="2.5" />
                                <circle cx="415" cy="96" r="13" fill="#78350f" stroke="#fbbf24" strokeWidth="2.5" />
                                <circle cx="455" cy="96" r="13" fill="#78350f" stroke="#fbbf24" strokeWidth="2.5" />
                                <circle cx="495" cy="98" r="9" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                                {/* Connecting Side Rod */}
                                <line x1="380" y1="96" x2="455" y2="96" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>


                    {/* =================================================
                        RAILWAY PHOTO SLOT (AFTER TRAIN EXITS)
                    ================================================= */}

                    {/* RAILWAY PHOTO SLOT TITLE */}
                    <div
                        ref={trainSlotInfoRef}
                        className="
                            pointer-events-none
                            absolute
                            top-16
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-amber-400">
                            Tracks & Memories
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-stone-100">
                            Stories Along the Railway
                        </h2>
                    </div>

                    {/* TRAIN PHOTO 1 (Far Left) */}
                    <div
                        ref={trainPhoto1Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/Add-ons/one.jpg", title: "Reflections on the Rails", desc: "Quiet moments of contemplation and scenic vistas along the route." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/Add-ons/one.jpg"
                                alt="Reflections on the Rails"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* TRAIN PHOTO 2 (Mid Left) */}
                    <div
                        ref={trainPhoto2Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/Add-ons/two.jpg", title: "Journeys Across the Tracks", desc: "Traveling through towns and landscapes that shaped beautiful memories." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/Add-ons/two.jpg"
                                alt="Journeys Across the Tracks"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* TRAIN PHOTO 3 (Mid Right) */}
                    <div
                        ref={trainPhoto3Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/Add-ons/three.JPG", title: "Nostalgic Horizons", desc: "The steady rhythm of the train and the joy of arriving somewhere special." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/Add-ons/three.JPG"
                                alt="Nostalgic Horizons"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* TRAIN PHOTO 4 (Far Right) */}
                    <div
                        ref={trainPhoto4Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/Add-ons/Four.jpg", title: "Adventures Along the Way", desc: "Every stop on the journey bringing new stories to tell." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/Add-ons/Four.jpg"
                                alt="Adventures Along the Way"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* =================================================
                        CHAPTER 3: AIRPLANE & SKY SCENE
                    ================================================= */}

                    {/* SKY TITLE */}
                    <div
                        ref={skyTextRef}
                        className="
                            pointer-events-none
                            absolute
                            top-24
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
                            Shiva Gupta
                        </p>
                        <h2 className="mt-3 text-3xl md:text-5xl font-light tracking-wide text-white">
                            When It Comes to foreign
                        </h2>
                    </div>


                    {/* CLOUDS LAYER */}
                    <div
                        ref={cloudsRef}
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-20
                            opacity-0
                            overflow-hidden
                        "
                    >
                        <div className="absolute top-1/4 -left-20 h-32 w-96 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute top-1/2 right-10 h-40 w-md rounded-full bg-cyan-200/10 blur-3xl" />
                        <div className="absolute bottom-1/3 left-1/3 h-28 w-80 rounded-full bg-white/5 blur-2xl" />
                    </div>


                    {/* AIRPLANE */}
                    <div
                        ref={airplaneRef}
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            z-70
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                        "
                    >
                        <div className="relative flex items-center">
                            {/* Vapor Contrails */}
                            <div className="absolute right-full mr-1 flex flex-col gap-3">
                                <div className="h-1 w-72 rounded-full bg-linear-to-l from-white/90 via-white/40 to-transparent blur-[1px]" />
                                <div className="h-1 w-80 rounded-full bg-linear-to-l from-cyan-200/80 via-cyan-100/30 to-transparent blur-[1px]" />
                            </div>

                            {/* SVG Airplane */}
                            <svg
                                viewBox="0 0 240 100"
                                className="w-60 md:w-80 drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Fuselage Body */}
                                <path
                                    d="M20 50 C40 46, 170 42, 210 47 C225 49, 235 52, 235 52 C235 52, 225 55, 210 57 C170 62, 40 58, 20 54 Z"
                                    fill="#f8fafc"
                                />
                                {/* Nose Cone */}
                                <path
                                    d="M210 47 C225 49, 235 52, 235 52 C235 52, 225 55, 210 57 Z"
                                    fill="#e2e8f0"
                                />
                                {/* Cockpit Windshield */}
                                <path
                                    d="M200 48 C208 49, 216 51, 218 52 C215 53, 208 53, 200 52 Z"
                                    fill="#38bdf8"
                                />
                                {/* Top Main Wing */}
                                <polygon
                                    points="130,48 80,10 105,10 160,48"
                                    fill="#e2e8f0"
                                />
                                {/* Top Winglet */}
                                <polygon
                                    points="80,10 75,5 82,5 86,10"
                                    fill="#0284c7"
                                />
                                {/* Lower Wing */}
                                <polygon
                                    points="120,56 75,90 100,90 150,56"
                                    fill="#cbd5e1"
                                />
                                {/* Tail Fin */}
                                <polygon
                                    points="45,46 20,15 38,15 65,46"
                                    fill="#0284c7"
                                />
                                {/* Stabilizer */}
                                <polygon
                                    points="40,54 22,70 34,70 52,54"
                                    fill="#94a3b8"
                                />
                                {/* Jet Engine 1 */}
                                <rect
                                    x="115"
                                    y="36"
                                    width="28"
                                    height="8"
                                    rx="4"
                                    fill="#64748b"
                                />
                                {/* Jet Engine 2 */}
                                <rect
                                    x="108"
                                    y="60"
                                    width="28"
                                    height="8"
                                    rx="4"
                                    fill="#475569"
                                />
                                {/* Cabin Windows */}
                                <circle cx="85" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="95" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="105" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="115" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="125" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="135" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="145" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="155" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="165" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="175" cy="51" r="1.5" fill="#38bdf8" />
                                <circle cx="185" cy="51" r="1.5" fill="#38bdf8" />
                            </svg>
                        </div>
                    </div>


                    {/* =================================================
                        POST-FLIGHT MEMORY GALLERY (CHAPTER 4 - SLOT 1)
                    ================================================= */}

                    {/* POST-PLANE TITLE */}
                    <div
                        ref={postPlaneInfoRef}
                        className="
                            pointer-events-none
                            absolute
                            top-16
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-amber-400">
                            Global Horizons
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-stone-100">
                            Across Skies & Borders
                        </h2>
                    </div>


                    {/* POST-PLANE PHOTO 1 (Far Left) */}
                    <div
                        ref={postPhoto1Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/one.jpg", title: "Adventures Across Borders", desc: "Setting foot into new lands with curiosity and a smile." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/one.jpg"
                                alt="Adventures Across Borders"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* POST-PLANE PHOTO 2 (Mid Left) */}
                    <div
                        ref={postPhoto2Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/two.jpg", title: "Iconic Cityscapes", desc: "Marveling at international landmarks and vibrant streetscapes." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/two.jpg"
                                alt="Iconic Cityscapes"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* POST-PLANE PHOTO 3 (Mid Right) */}
                    <div
                        ref={postPhoto3Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/three.jpg", title: "Exploring Grand Sights", desc: "Discovering architectural marvels and timeless destinations." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/three.jpg"
                                alt="Exploring Grand Sights"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* POST-PLANE PHOTO 4 (Far Right) */}
                    <div
                        ref={postPhoto4Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/IMG-20200208-WA0021.jpg", title: "Frozen in Distant Lands", desc: "Special moments captured beneath distant skies." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/IMG-20200208-WA0021.jpg"
                                alt="Frozen in Distant Lands"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* =================================================
                        SLOT 2: SECOND 4-PHOTO GALLERY
                    ================================================= */}

                    {/* SLOT 2 TITLE */}
                    <div
                        ref={slot2InfoRef}
                        className="
                            pointer-events-none
                            absolute
                            top-16
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">
                            World Explorer
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-stone-100">
                            Monuments & Grand Avenues
                        </h2>
                    </div>


                    {/* SLOT 2 PHOTO 1 (Far Left) */}
                    <div
                        ref={slot2Photo1Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/DSC02132.JPG", title: "Skylines & Architecture", desc: "Standing amidst monumental history and breathtaking sights." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/DSC02132.JPG"
                                alt="Skylines & Architecture"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 2 PHOTO 2 (Mid Left) */}
                    <div
                        ref={slot2Photo2Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/DSC02180.JPG", title: "Historic Streets", desc: "Walking through picturesque avenues with joy and wonder." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/DSC02180.JPG"
                                alt="Historic Streets"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 2 PHOTO 3 (Mid Right) */}
                    <div
                        ref={slot2Photo3Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/DSC02240.JPG", title: "Heritage & Grandeur", desc: "Experiencing the grandeur of world-renowned culture." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/DSC02240.JPG"
                                alt="Heritage & Grandeur"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 2 PHOTO 4 (Far Right) */}
                    <div
                        ref={slot2Photo4Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/DSC02297.JPG", title: "Continents Explored", desc: "Journeys that created stories to remember for a lifetime." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/DSC02297.JPG"
                                alt="Continents Explored"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* =================================================
                        SLOT 3: THIRD 4-PHOTO GALLERY
                    ================================================= */}

                    {/* SLOT 3 TITLE */}
                    <div
                        ref={slot3InfoRef}
                        className="
                            pointer-events-none
                            absolute
                            top-16
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-rose-400">
                            Scenic Wonders
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-stone-100">
                            Breezes & Sunlit Vistas
                        </h2>
                    </div>


                    {/* SLOT 3 PHOTO 1 (Far Left) */}
                    <div
                        ref={slot3Photo1Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/DSC02303.JPG", title: "Sunlit Avenues", desc: "Warm sunshine and picturesque corners of the world." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/DSC02303.JPG"
                                alt="Sunlit Avenues"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 3 PHOTO 2 (Mid Left) */}
                    <div
                        ref={slot3Photo2Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/DSC02388.JPG", title: "Breathtaking Panoramas", desc: "Stunning viewpoints overlooking coastal beauty." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/DSC02388.JPG"
                                alt="Breathtaking Panoramas"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 3 PHOTO 3 (Mid Right) */}
                    <div
                        ref={slot3Photo3Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/DSC02543.JPG", title: "Under Distant Skies", desc: "Pure serenity and happiness in open spaces." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/DSC02543.JPG"
                                alt="Under Distant Skies"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 3 PHOTO 4 (Far Right) */}
                    <div
                        ref={slot3Photo4Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/international/DSC02591.JPG", title: "The Joy of Discovery", desc: "Smiling brightly against picturesque travel backdrops." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/international/DSC02591.JPG"
                                alt="The Joy of Discovery"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* =================================================
                        SLOT 4: FOURTH 4-PHOTO GALLERY
                    ================================================= */}

                    {/* SLOT 4 TITLE */}
                    <div
                        ref={slot4InfoRef}
                        className="
                            pointer-events-none
                            absolute
                            top-16
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-amber-400">
                            Timeless Journeys
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-stone-100">
                            Memories Across Continents
                        </h2>
                    </div>


                    {/* SLOT 4 PHOTO 1 (Far Left) */}
                    <div
                        ref={slot4Photo1Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/four.jpg", title: "Modern Marvels", desc: "Exploring dazzling modern skylines and architecture." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/four.jpg"
                                alt="Modern Marvels"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 4 PHOTO 2 (Mid Left) */}
                    <div
                        ref={slot4Photo2Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/five.jpg", title: "Winter Escapades", desc: "Cozy days and wonderful memories in chilly cities." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/five.jpg"
                                alt="Winter Escapades"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 4 PHOTO 3 (Mid Right) */}
                    <div
                        ref={slot4Photo3Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/six.jpg", title: "Cherished Global Escapades", desc: "Every adventure enriched by your presence and joy." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/six.jpg"
                                alt="Cherished Global Escapades"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 4 PHOTO 4 (Far Right) */}
                    <div
                        ref={slot4Photo4Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/seven.jpg", title: "Golden Milestones", desc: "Precious family moments filled with laughter and love." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/seven.jpg"
                                alt="Golden Milestones"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* =================================================
                        SLOT 5: FIFTH 4-PHOTO GALLERY (CELEBRATIONS & SMILES)
                    ================================================= */}

                    {/* SLOT 5 TITLE */}
                    <div
                        ref={slot5InfoRef}
                        className="
                            pointer-events-none
                            absolute
                            top-16
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-pink-400">
                            Celebrations & Warmth
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-stone-100">
                            Smiles That Light Up Our World
                        </h2>
                    </div>


                    {/* SLOT 5 PHOTO 1 (Far Left) */}
                    <div
                        ref={slot5Photo1Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/eigth.jpg", title: "Joyful Gatherings", desc: "Festive warmth and happy moments celebrated together." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/eigth.jpg"
                                alt="Joyful Gatherings"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 5 PHOTO 2 (Mid Left) */}
                    <div
                        ref={slot5Photo2Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/ten.jpg", title: "Laughter in Every Moment", desc: "The brightest smiles and most precious evening memories." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/ten.jpg"
                                alt="Laughter in Every Moment"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 5 PHOTO 3 (Mid Right) */}
                    <div
                        ref={slot5Photo3Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/nine.JPG", title: "Morning Sunshine & Radiance", desc: "A heartwarming capture of bright smiles, warmth, and happiness." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/nine.JPG"
                                alt="Morning Sunshine & Radiance"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* SLOT 5 PHOTO 4 (Far Right) */}
                    <div
                        ref={slot5Photo4Ref}
                        onClick={() => setLightboxImage({ src: "/images/papa/inter/eleven.jpg", title: "Forever Cherished", desc: "Special moments that will stay in our hearts always." })}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            w-44
                            md:w-52
                            lg:w-60
                            -translate-x-1/2
                            -translate-y-1/2
                            opacity-0
                            cursor-pointer
                            group
                        "
                    >
                        <div className="aspect-4/5 overflow-hidden rounded-md bg-white p-2.5 md:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/images/papa/inter/eleven.jpg"
                                alt="Forever Cherished"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>


                    {/* =================================================
                        TRAFFIC LIGHT ANIMATION (FINAL END SLOT)
                    ================================================= */}

                    {/* TRAFFIC LIGHT TITLE */}
                    <div
                        ref={trafficLightTextRef}
                        className="
                            pointer-events-none
                            absolute
                            top-16
                            left-1/2
                            z-30
                            w-full
                            -translate-x-1/2
                            text-center
                            opacity-0
                        "
                    >
                        <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">
                        </p>
                        <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-stone-100">
                            From Jhandhu's
                        </h2>
                    </div>

                    {/* TRAFFIC LIGHT COMPONENT */}
                    <div
                        ref={trafficLightContainerRef}
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            -translate-x-1/2
                            -translate-y-1/2
                            flex
                            flex-col
                            items-center
                            opacity-0
                        "
                    >
                        {/* Traffic Light Housing */}
                        <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-neutral-900/90 p-5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-neutral-700/60 backdrop-blur-md">
                            {/* Visor & RED LIGHT */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute -top-2 h-4 w-20 rounded-t-full bg-neutral-950 border-t border-neutral-700" />
                                <div
                                    ref={redLightRef}
                                    className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-linear-to-br from-red-500 via-red-600 to-red-900 border-2 border-red-950 opacity-20 transition-all duration-300 shadow-inner"
                                />
                            </div>

                            {/* Visor & YELLOW LIGHT */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute -top-2 h-4 w-20 rounded-t-full bg-neutral-950 border-t border-neutral-700" />
                                <div
                                    ref={yellowLightRef}
                                    className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-amber-800 border-2 border-amber-950 opacity-20 transition-all duration-300 shadow-inner"
                                />
                            </div>

                            {/* Visor & GREEN LIGHT */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute -top-2 h-4 w-20 rounded-t-full bg-neutral-950 border-t border-neutral-700" />
                                <div
                                    ref={greenLightRef}
                                    className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-800 border-2 border-emerald-950 opacity-20 transition-all duration-300 shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Pole */}
                        <div className="h-20 w-4 bg-linear-to-b from-neutral-800 to-neutral-950 border-x border-neutral-700" />

                        {/* Dynamic Signal Subtitle Pill */}
                        <div className="mt-4 rounded-full bg-neutral-900/90 px-6 py-2 border border-neutral-700/60 shadow-lg">
                            <p
                                ref={signalLabelRef}
                                className="text-sm md:text-base font-medium tracking-wide text-neutral-300 transition-colors duration-300"
                            >
                                Traffic Signal
                            </p>
                        </div>
                    </div>

                    {/* Grand Finale Birthday Cake CTA */}
                    <div
                        ref={cakeBtnRef}
                        className="
                            pointer-events-auto
                            absolute
                            bottom-8
                            left-1/2
                            z-50
                            -translate-x-1/2
                            flex
                            flex-col
                            items-center
                            gap-2
                            opacity-0
                            translate-y-6
                        "
                    >
                        <button
                            onClick={() => navigate('/cake')}
                            className="group inline-flex h-12 min-w-50 items-center justify-center rounded-full border border-emerald-500/80 bg-emerald-950 px-8 text-xs font-normal uppercase tracking-[0.2em] text-emerald-300 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-400 hover:text-neutral-950 hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                            <span>CUT THE CAKE</span>
                            <span className="ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                    </div>

                </div>

            </section>

            {/* INTERACTIVE LIGHTBOX MODAL */}
            {lightboxImage && (
                <div
                    onClick={() => setLightboxImage(null)}
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-all duration-300 animate-fadeIn"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-h-[90vh] max-w-4xl rounded-2xl bg-neutral-900/95 border border-neutral-700/70 p-3 sm:p-5 shadow-2xl flex flex-col items-center"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute -top-3 -right-3 sm:top-4 sm:right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-stone-300 hover:text-white border border-neutral-600 transition-colors shadow-lg cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="max-h-[72vh] overflow-hidden rounded-xl bg-black/40 flex items-center justify-center">
                            <img
                                src={lightboxImage.src}
                                alt={lightboxImage.title}
                                className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-inner"
                            />
                        </div>

                        <div className="mt-3 text-center px-4">
                            <h3 className="text-base sm:text-lg font-medium text-stone-100">
                                {lightboxImage.title}
                            </h3>
                            {lightboxImage.desc && (
                                <p className="mt-1 text-xs sm:text-sm text-stone-400 max-w-md">
                                    {lightboxImage.desc}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default Story;