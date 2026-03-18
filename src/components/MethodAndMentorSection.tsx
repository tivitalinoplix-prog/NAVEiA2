import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Brain, Shield, Target, Sparkles, Instagram, Linkedin, ArrowUpRight, Dna, Lightbulb, ShieldCheck } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';
import { DiagnosticGrid } from './DiagnosticGrid';

const CyberpunkFilters = () => (
  <svg className="hidden">
    <defs>
      <filter id="sepia">
        <feColorMatrix type="matrix" values="0.393 0.769 0.189 0 0  0.349 0.686 0.168 0 0  0.272 0.534 0.131 0 0  0 0 0 1 0"/>
      </filter>
      <filter id="bw-professional">
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <filter id="duotone-red">
        <feColorMatrix type="matrix" values="0.8 0 0 0 0.2  0 0.3 0 0 0.1  0 0 0.3 0 0.1  0 0 0 1 0" />
      </filter>
      <filter id="glitch-distort">
        <feTurbulence baseFrequency="0.01 0.2" numOctaves="2" type="fractalNoise" result="glitch-noise" />
        <feDisplacementMap in="SourceGraphic" in2="glitch-noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

export function MethodAndMentorSection() {
  const sectionRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const [photoFilter, setPhotoFilter] = useState('url(#duotone-red)');

  return (
    <div ref={sectionRef} className="relative w-full border-t border-b border-white/10 overflow-hidden bg-[#050505]">
      {/* Shared Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <img src="https://i.postimg.cc/fTr2CQYp/hero_bg.jpg" alt="Reveal" className="w-full h-[150%] object-cover grayscale opacity-50" />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-black/50 pointer-events-none" /> {/* 50% Shadow overlay */}
      
      {/* METHOD SECTION */}
      <section id="method" className="relative z-10 w-full py-24 pb-12 overflow-hidden bg-white/[0.02] backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <FadeIn className="mb-16"><span className="font-medium uppercase mb-4 block text-[#E8272A] tracking-widest text-xs flex items-center gap-2"><motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 rounded-full bg-[#E8272A]" />O Framework</span><h2 className="text-4xl lg:text-6xl font-display font-medium tracking-tighter text-white mb-6 leading-[1.1]">O Método <span className="text-white">NA VEıA</span></h2><p className="text-white text-lg max-w-xl leading-relaxed font-light">3 pilares fundamentais. Precisão técnica absoluta para escalar seu negócio com estruturação automatizada e IA.</p></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
            <FadeIn delay={0.1} direction="left" className="md:col-span-2"><TiltCard><div className="group relative bg-[#E8272A]/90 backdrop-blur-md border border-white/10 p-8 lg:p-12 flex flex-col md:flex-row justify-between hover:border-white/30 transition-colors overflow-hidden min-h-[350px] gap-8 rounded-none h-full"><div className="relative z-10 flex flex-col justify-between h-full"><div><div className="w-14 h-14 flex items-center justify-center bg-white/10 rounded-none text-white mb-8 border border-white/20 backdrop-blur-sm"><Cpu className="w-6 h-6" /></div><h3 className="text-2xl lg:text-4xl font-display font-medium tracking-tight mb-4 text-white">Ecossistemas SaaS & Antigravity</h3><p className="text-base lg:text-lg text-white leading-relaxed font-light max-w-md">Desenvolvimento Full-Stack de aplicativos B2B sob medida. Utilizamos o framework de engenharia Antigravity para criar infraestruturas digitais de alta performance, garantindo implantação rápida, segura e escalável.</p></div></div><div className="relative z-10 flex items-center justify-center w-full md:w-auto flex-1 mt-6 md:mt-0 bg-black/30 backdrop-blur-sm p-6 rounded-none border border-white/10"><DiagnosticGrid /></div></div></TiltCard></FadeIn>
            <FadeIn delay={0.15} direction="right" className="md:col-span-1"><TiltCard><div className="group relative bg-[#111111]/80 backdrop-blur-md border border-white/10 p-8 lg:p-12 flex flex-col justify-between hover:border-[#FF2D30] transition-colors min-h-[350px] rounded-none h-full"><div className="relative z-10 h-full flex flex-col"><div className="w-14 h-14 flex items-center justify-center bg-[#1A1A1A] rounded-none text-[#E8272A] mb-8 border border-white/5"><Brain className="w-6 h-6" /></div><h3 className="text-xl lg:text-2xl font-display font-medium tracking-tight mb-4 text-white">Agentes Autônomos (Google AI Workspace)</h3><p className="text-sm lg:text-base text-white/80 leading-relaxed font-light mb-8">Automação de back-office com Agentic AI. Dominamos o workspace laboratorial do Google (Vertex AI/AI Studio) para orquestrar agentes autônomos que operam 24/7 na gestão de contratos, SMS e relatórios offshore.</p><div className="mt-auto w-full border border-white/5 bg-[#050505]/80 p-5 rounded-none font-tech text-xs leading-relaxed tracking-wider overflow-hidden relative"><div className="flex gap-2 mb-4 opacity-50 border-b border-white/5 pb-3"><div className="w-3 h-3 rounded-none bg-[#E8272A]"></div><div className="w-3 h-3 rounded-none bg-white/20"></div><div className="w-3 h-3 rounded-none bg-white/20"></div></div><div className="space-y-2"><motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}><span className="text-white/50">&gt;</span> <span className="text-white">Initializing Google_AI_Workspace...</span></motion.p><motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}><span className="text-white/50">&gt;</span> <span className="text-white">Connecting Perplexity_API...</span></motion.p><motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.0, ease: "easeInOut" }}><span className="text-white/50">&gt;</span> <span className="text-white">Antigravity Framework:</span> <span className="text-[#E8272A] font-bold">ACTIVE</span></motion.p><motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.4, ease: "easeInOut" }}><span className="text-white/50">&gt;</span> <span className="text-white">System Status:</span> <span className="text-[#E8272A] font-bold">Zero_Hallucinations</span><span className="inline-block w-2 h-4 ml-1 align-middle bg-[#E8272A] animate-pulse"></span></motion.p></div></div></div></div></TiltCard></FadeIn>
            <FadeIn delay={0.2} direction="left" className="md:col-span-3"><TiltCard><div className="group relative bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between hover:border-[#FF2D30] transition-colors min-h-[300px] rounded-none h-full"><div className="relative z-10 max-w-2xl mb-8 md:mb-0"><div className="w-14 h-14 flex items-center justify-center bg-[#111111] rounded-none text-[#E8272A] mb-8 border border-white/5"><Shield className="w-6 h-6" /></div><h3 className="text-2xl lg:text-4xl font-display font-medium tracking-tight mb-4 text-white">Auditoria & Deep Research (Perplexity)</h3><p className="text-base lg:text-lg text-white/80 leading-relaxed font-light">Mitigação de riscos e Zero Alucinações. Aliamos a precisão da Neurociência ao motor de raciocínio do Perplexity para realizar fact-checking extremo, Red Teaming e validação de dados críticos da sua operação.</p></div><div className="relative z-10 w-full md:w-auto flex items-center justify-center gap-8 hidden md:flex shrink-0"><motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-32 h-32 rounded-full border border-[#E8272A]/30 flex items-center justify-center bg-[#E8272A]/10 relative"><div className="absolute inset-0 rounded-full border border-[#E8272A]/20 animate-ping opacity-20"></div><Target className="w-12 h-12 text-[#E8272A]" /></motion.div><div className="flex flex-col gap-4"><div className="w-24 h-2 bg-white opacity-30 rounded-full"></div><div className="w-48 h-2 bg-white opacity-30 rounded-full"></div><div className="w-32 h-2 bg-[#E8272A] rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div></div></div></div></TiltCard></FadeIn>
          </div>
        </div>
      </section>

      {/* MENTOR SECTION */}
      <section id="mentor" className="relative z-10 text-white w-full overflow-hidden bg-white/[0.01]">
        <CyberpunkFilters />
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full relative z-10">
          <div className="col-span-1 lg:col-span-4 p-6 lg:p-16 border-t border-b border-white/10 flex flex-col items-start gap-6 pt-16">
            <FadeIn><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111]/80 backdrop-blur-md border border-white/10"><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Sparkles className="w-4 h-4 text-[#E8272A]" /></motion.div><span className="text-xs font-medium tracking-wide text-[#FFFFFF] uppercase">O Especialista</span></div></FadeIn>
            <FadeIn delay={0.1}><h2 className="text-6xl lg:text-[8rem] font-medium font-display tracking-tighter text-[#FFFFFF] leading-[0.85] flex items-center gap-4">VITALINO<span className="inline-block w-[0.18em] h-[0.16em] bg-[#E8272A] rounded-[0.04em] -skew-x-[9deg] animate-pulse shrink-0" style={{ verticalAlign: 'middle' }} /></h2></FadeIn>
            <FadeIn delay={0.2}><p className="text-[#E4E4E7] text-lg lg:text-2xl max-w-2xl font-light leading-relaxed mt-4">Especialista em Avaliação de Inteligência Artificial e Engenharia de Prompt.</p></FadeIn>
          </div>
          <div className="col-span-1 lg:col-span-1 flex flex-col min-h-[600px] bg-[#111111]/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white/10 p-6 lg:p-8 justify-between relative">
            <FadeIn delay={0.3} direction="up" className="flex flex-col gap-8 h-full relative z-10">
              <TiltCard>
                <div onClick={() => setPhotoFilter('url(#sepia)')} className="aspect-[4/5] overflow-hidden group bg-black w-full rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.6)] relative cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
                  <div className="absolute inset-0 w-full h-full overflow-hidden transition-[filter] duration-700" style={{ filter: photoFilter }}>
                    <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,rgba(0,0,0,0.3)_70%,rgba(5,5,5,0.8)_100%)] mix-blend-overlay opacity-50" />
                    <motion.img src="https://i.postimg.cc/SNvTdbcP/mentor.jpg" alt="Vitalino" className="w-full h-full object-cover brightness-[1.2] contrast-[1.1] transition-all duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 z-30 shadow-[inset_0_0_80px_rgba(5,5,5,0.5)] pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]"><div className="w-1.5 h-1.5 rounded-full bg-[#E8272A] shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div><span className="text-[10px] font-medium uppercase tracking-wider text-[#FFFFFF]">Auth_Key Verified</span></div>
                  </div>
                </div>
              </TiltCard>
              <div><h3 className="text-2xl font-medium tracking-tight mb-2 text-[#FFFFFF]">Quem sou eu</h3><p className="text-sm text-[#E4E4E7] leading-relaxed font-light">Especialista em Engenharia de Conhecimento.</p></div>
              <div className="flex items-center gap-3">{[Instagram, Linkedin].map((I, k) => <MagneticButton key={k} href="https://wa.me/5522998586180" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#FF2D30] transition-all"><I className="w-4 h-4" /></MagneticButton>)}</div>
            </FadeIn>
            <FadeIn delay={0.4} className="relative z-10"><MagneticButton href="https://wa.me/5522998586180" target="_blank" rel="noreferrer" className="group mt-12 w-full py-4 px-6 bg-white text-black rounded-full font-semibold text-sm tracking-wide flex items-center justify-between hover:bg-white/90 transition-all uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)]">Falar comigo<motion.div animate={{ x: [0, 5, 0], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}><ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1" /></motion.div></MagneticButton></FadeIn>
          </div>
          <div className="col-span-1 lg:col-span-3 flex flex-col h-full bg-[#050505]/60 backdrop-blur-md border-t lg:border-t-0 border-white/5">
            <div className="p-8 lg:p-20 border-b border-white/10 min-h-[300px] flex flex-col justify-center"><p className="text-xl lg:text-3xl font-light leading-snug text-[#FFFFFF] max-w-3xl">"Minha especialidade é capturar a inteligência do seu negócio e transformá-la em fluxos automatizados. Combinando Neurociência com o desenvolvimento de fluxos recursivos e alinhamento de LLMs, garanto que a IA atue a seu favor com precisão cirúrgica."</p><div className="flex flex-wrap gap-3 mt-12">{['Neurociências', 'IA Generativa', 'Engenharia de Prompt', 'LLM Alignment', 'RLHF', 'MBA IA', 'Psicologia Cognitiva'].map(tag => (<span key={tag} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium uppercase tracking-wider text-[#FFFFFF] hover:text-[#FFFFFF] hover:bg-[#E8272A]/20 hover:border-[#E8272A]/50 transition-colors cursor-default shadow-[0_0_10px_rgba(232,39,42,0)] hover:shadow-[0_0_15px_rgba(232,39,42,0.2)]"># {tag}</span>))}</div></div>
            <div className="flex-1 bg-[#111111]/30 flex flex-col">{[{ icon: Dna, title: "Base Científica Aplicada" }, { icon: Lightbulb, title: "Ciência da Inovação" }, { icon: ShieldCheck, title: "Gestão de IA Aplicada" }, { icon: Brain, title: "Processos Cognitivos" }].map((item, i) => (
              <div key={i} className="group flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 lg:px-12 border-b border-white/10 hover:bg-[#E8272A]/5 hover:border-l-2 hover:border-l-[#E8272A] transition-all cursor-default gap-4"><div className="flex items-center gap-8 w-full lg:w-auto"><div className="flex items-center gap-3 w-32"><item.icon className="w-5 h-5 text-[#E4E4E7] group-hover:text-[#E8272A] transition-colors" /><span className="text-sm font-medium text-[#E4E4E7] group-hover:text-[#FFFFFF]">Pilar</span></div><h4 className="text-xl font-medium tracking-tight text-[#FFFFFF]">{item.title}</h4></div></div>
            ))}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
