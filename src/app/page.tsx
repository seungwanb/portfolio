"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Moon, Sun, Globe, Smartphone, ExternalLink, Images } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ 단일 파일 원페이지 포트폴리오 컴포넌트
// - Tailwind + Framer Motion + shadcn/ui 사용
// - 다크모드 토글, 스무스 스크롤, 프로젝트 모달, 반응형 그리드
// - 이미지/링크/텍스트만 바꾸면 바로 실사용 가능

const skills = [
  { name: "Photoshop", level: 90 },
  { name: "Illustrator", level: 65 },
  { name: "HTML/CSS", level: 95 },
  { name: "JavaScript", level: 85 },
  { name: "React/Next", level: 80 },
  { name: "TailwindCSS", level: 90 },
  { name: "Figma", level: 80 },
  { name: "Publisher", level: 95 },
];

const projects = [
  {
    id: 1,
    title: "브랜딩 사이트 리디자인",
    subtitle: "UI/UX · 퍼블리싱",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    tags: ["Figma", "HTML", "CSS", "GSAP"],
    link: "#",
    github: "#",
    shots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "리브랜딩 가이드에 맞춰 컬러/타이포 시스템을 재정의하고 반응형 그리드로 컴포넌트화.",
    role: "아트디렉션, 퍼블리싱, 반응형 최적화",
    outcome: "전환율 18%↑, 페이지 로딩 42% 단축",
  },
  {
    id: 2,
    title: "이커머스 프로모션 랜딩",
    subtitle: "디자인 · 인터랙션",
    cover: "https://images.unsplash.com/photo-1555580399-e0ab2402a1b3?q=80&w=1600&auto=format&fit=crop",
    tags: ["Photoshop", "Illustrator", "Tailwind", "Motion"],
    link: "#",
    github: "#",
    shots: [
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "스크롤 기반 마이크로 인터랙션으로 상품 USP를 자연스럽게 노출하는 원페이지 랜딩.",
    role: "키비주얼, 3D텍스트, 스크롤 애니메이션",
    outcome: "프로모션 기간 매출 2.1배",
  },
  {
    id: 3,
    title: "포트폴리오 템플릿",
    subtitle: "React · Tailwind",
    cover: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Tailwind", "Framer Motion"],
    link: "#",
    github: "#",
    shots: [
      "https://images.unsplash.com/photo-1551281044-8a5afc6df34b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "디자이너/퍼블리셔를 위한 원페이지 템플릿. 데이터만 바꿔도 바로 배포 가능.",
    role: "디자인 시스템, 컴포넌트 설계",
    outcome: "사이드 프로젝트 3건에 재사용",
  },
];

const links = [ 
];

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

function Section({ id, title, children, subtitle }) {
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold tracking-tight"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium leading-5 dark:border-neutral-700 dark:text-neutral-200">
      {children}
    </span>
  );
}

function Progress({ value }) {
  return (
    <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
      <div
        className="h-full bg-black dark:bg-white"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ProjectModal({ open, onClose, project }) {
  const ref = useRef(null);
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 m-auto h-[82vh] w-[92vw] max-w-5xl overflow-hidden rounded-2xl bg-white dark:bg-neutral-950 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b px-5 py-4 dark:border-neutral-800">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{project.subtitle}</p>
          </div>
          <button onClick={onClose} className="rounded-lg border px-3 py-1 text-sm dark:border-neutral-700">닫기</button>
        </div>
        <div className="grid h-[calc(82vh-64px)] md:grid-cols-2 overflow-y-auto">
          <div className="p-5 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">프로젝트 개요</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>{project.description}</p>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">역할</div>
                  <div>{project.role}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">성과</div>
                  <div>{project.outcome}</div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="flex gap-3 pt-3">
                  {project.link !== "#" && (
                    <a href={project.link} target="_blank" className="inline-flex items-center gap-1 text-sm underline">
                      사이트 보기 <ExternalLink size={16} />
                    </a>
                  )}
                  {project.github !== "#" && (
                    <a href={project.github} target="_blank" className="inline-flex items-center gap-1 text-sm underline">
                      코드 보기 <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {project.shots.map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-xl border dark:border-neutral-800">
                  <img src={src} alt="shot" className="h-56 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function OnePagePortfolio() {
  const { dark, setDark } = useDarkMode();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState(null);

  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "skills", label: "Skills" },
      { id: "works", label: "Works" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  // 인터섹션 옵저버로 현재 섹션 하이라이트
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const handleOpen = (p) => {
    setPicked(p);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white dark:bg-neutral-950 dark:text-white">
      {/* NAVBAR */}
      <div className="fixed inset-x-0 top-0 z-40 border-b bg-white/70 backdrop-blur-md dark:bg-neutral-950/70 dark:border-neutral-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="font-semibold tracking-tight">Bang Seungwan</a>
          <div className="hidden gap-1 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={
                  "rounded-xl px-3 py-2 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 " +
                  (active === s.id ? "bg-neutral-100 dark:bg-neutral-800" : "")
                }
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9 px-3" onClick={() => setDark((v) => !v)}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="relative flex min-h-[88vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(0,0,0,0.08),rgba(0,0,0,0)_60%)] dark:bg-[radial-gradient(60%_40%_at_50%_10%,rgba(255,255,255,0.12),rgba(0,0,0,0)_60%)]" />
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs dark:border-neutral-700">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              Available for work
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              Web Designer &amp;  Publisher<br className="hidden md:block" />
              <span className="bg-gradient-to-r from-black to-neutral-500 bg-clip-text text-transparent dark:from-white dark:to-neutral-400">Bang Seungwan</span>
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300">
              브랜드 아이덴티티부터 웹 퍼블리싱까지. 속도, 디테일, 전환율에 집착합니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#works" className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-white shadow-lg dark:bg-white dark:text-black">
                작업물 보러가기 <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              {links.map(({ href, label, icon: Icon }) => (
                <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} className="inline-flex items-center gap-2 hover:underline">
                  <Icon size={16} /> {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" subtitle="툴과 스택, 객관적으로 보여줍니다.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {skills.map((s) => (
            <Card key={s.name} className="rounded-2xl border dark:border-neutral-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{s.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">{s.level}%</div>
                <Progress value={s.level} />
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* WORKS */}
      <Section id="works" title="Works" subtitle="핵심만 강하게. 임팩트 중심으로 선별했습니다.">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
                <div className="relative">
                  <img src={p.cover} alt={p.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold">{p.title}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{p.subtitle}</p>
                    </div>
                    <button
                      onClick={() => handleOpen(p)}
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
                    >
                      <Images size={14} /> 보기
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          더 많은 작업물이 필요하면 섹션을 복제해 갤러리/케이스 스터디로 확장하세요.
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" title="About" subtitle="결과 만드는 디자이너. 디테일과 일정 둘 다 잡습니다.">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="order-2 md:order-1 md:col-span-2">
            <ul className="space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              <li>• 브랜드 가이드 수립, UI 컴포넌트 설계, 반응형 퍼블리싱까지 풀 스택 협업.</li>
              <li>• 속도와 접근성 준수: Lighthouse 95+ 목표, a11y 체크 기본 탑재.</li>
              <li>• 커뮤니케이션: 요구사항 → 와이어프레임 → 프로토타입 → QA → 배포 흐름 체계화.</li>
              <li>• 즐겨 쓰는 것들: Tailwind, Framer Motion, Figma, Notion, Linear.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">
                함께 일해보기 <ArrowUpRight size={16} />
              </a>
              <a href="/portfolio.pdf" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm dark:border-neutral-700">
                포트폴리오 PDF
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="overflow-hidden rounded-2xl border dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1603575449299-b5d26f57bb43?q=80&w=1600&auto=format&fit=crop"
                alt="profile"
                className="h-64 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <Card className="rounded-2xl border dark:border-neutral-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">연락처</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Mail size={16} /> okbk0478@email.com</div>
              <div className="flex items-center gap-2"><Smartphone size={16} /> 010-7118-0478</div>
              <div className="flex flex-wrap gap-3 pt-2">
                {links.map(({ href, label, icon: Icon }) => (
                  <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs dark:border-neutral-700">
                    <Icon size={14} /> {label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>


        </div>
      </Section>

      <footer className="border-t py-10 text-center text-xs text-neutral-500 dark:border-neutral-800">
        © {new Date().getFullYear()} okbk. All rights reserved.
      </footer>

      {/* MODAL */}
      <ProjectModal open={open} onClose={() => setOpen(false)} project={picked} />
    </div>
  );
}
