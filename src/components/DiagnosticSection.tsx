import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ShieldCheck, RefreshCw, Lock, ArrowUpRight, Sparkles } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';
import { TypingEffect } from './TypingEffect';
import { ScrambleText } from './ScrambleText';

export function DiagnosticSection() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const handleAnalyze = () => {
    if (!input.trim() || response) return;
    setIsProcessing(true);
    setTimeout(() => {
      setResponse("Entendo sua situação.\n\nO cenário que você descreveu é clássico de operações que ainda não passaram por uma reestruturação com IA. Para sair dessa, precisamos atacar a Otimização de Processos imediatamente.\n\nIdentifique os 3 processos que mais consomem tempo da sua equipe e vamos criar fluxos automatizados com precisão técnica.\n\nSe você quer parar de perder tempo com retrabalho e ter operações escaláveis, você precisa agendar um diagnóstico de processos agora.");
      setIsProcessing(false);
    }, 2000);
  };
  return (
    <section id="ai-consultant" className="relative z-20 w-full border-b border-white/10 bg-[#050505]">
      <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/10">
        <div className="col-span-1 lg:col-span-5 p-8 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#E8272A]">
          <FadeIn><div><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md"><motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}><MessageSquare className="w-4 h-4 text-white" /></motion.div><span className="text-xs font-medium tracking-wide text-white uppercase">AI Diagnostic</span></div><h2 className="text-4xl lg:text-6xl font-medium font-display tracking-tighter text-white leading-[1.1] mb-6">Vitalino <span className="text-white block mt-2">AI Diagnostic</span></h2><p className="text-base lg:text-lg text-white font-light leading-relaxed max-w-md">A inovação chegou à gestão corporativa. Treinada com o nosso <span className="text-white font-medium">framework exclusivo e metodologias avançadas de LLM Alignment</span>, ela oferece uma amostra cirúrgica do raciocínio estratégico que aplicamos nos projetos.</p></div></FadeIn>
          <FadeIn delay={0.2}><div className="hidden lg:flex items-center gap-2 text-sm text-white mt-12 font-medium tracking-widest uppercase"><ShieldCheck className="w-5 h-5" /><span>100% Secure & Private</span></div></FadeIn>
        </div>
        <div className="col-span-1 lg:col-span-7 p-8 lg:p-20 flex flex-col justify-center bg-[#111111]">
          <div className="w-full max-w-2xl mx-auto space-y-12">
            <FadeIn delay={0.1} direction="left"><TiltCard><div className="relative group"><label className="block uppercase text-xs font-medium text-white tracking-widest mb-4">Descreva seu desafio:</label><textarea value={input} onChange={(e) => setInput(e.target.value)} disabled={!!response || isProcessing} className="w-full bg-black/20 border border-white/10 text-white p-6 rounded-2xl focus:outline-none focus:border-[#E8272A] focus:ring-1 focus:ring-[#E8272A] transition-all resize-none h-40 font-light text-lg disabled:opacity-50" placeholder="Ex: Minha equipe gasta 4 horas por dia redigindo relatórios técnicos..." /></div></TiltCard></FadeIn>
            <FadeIn delay={0.2} direction="left"><div className="flex justify-end"><MagneticButton onClick={handleAnalyze} disabled={!input.trim() || isProcessing || !!response} className="group relative px-8 py-4 bg-[#E8272A] text-white font-semibold tracking-wide uppercase text-sm disabled:bg-white/10 disabled:text-white/50 hover:bg-[#FF2D30] transition-all overflow-hidden rounded-full flex items-center gap-3">{isProcessing ? <><RefreshCw className="w-5 h-5 animate-spin" />Analisando...</> : response ? <><Lock className="w-4 h-4" />Limit Reached</> : <>Analisar Gargalo<motion.div animate={{ x: [0, 5, 0], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}><ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1" /></motion.div></>}</MagneticButton></div></FadeIn>
            <AnimatePresence>{response && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8"><TiltCard><div className="border border-[#E8272A]/30 bg-[#E8272A]/5 p-8 relative overflow-hidden rounded-2xl"><div className="absolute top-0 left-0 w-1 h-full bg-[#E8272A]"></div><div className="flex items-center gap-3 mb-6"><div className="w-8 h-8 rounded-full bg-[#E8272A] flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div><span className="text-xs font-medium tracking-widest text-[#E8272A] uppercase">AI Response</span></div><p className="text-white text-lg leading-relaxed font-light whitespace-pre-wrap mb-8"><TypingEffect text={response} /></p><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="border-l-2 border-[#E8272A] pl-4 py-3 bg-[#E8272A]/10 mt-6 rounded-r-lg"><strong className="text-[#E8272A] block mb-2 text-xs tracking-widest uppercase font-medium">⚡ <ScrambleText text="Single Query Limit Reached" trigger={1} /></strong><p className="mb-4 text-xs text-white font-light">O framework NA VEiA é denso e requer acompanhamento. Para estratégias ilimitadas, agende um diagnóstico.</p><a href="https://wa.me/5522998586180" target="_blank" rel="noreferrer" className="inline-block bg-[#E8272A] text-white text-[10px] font-bold px-4 py-2 tracking-widest uppercase hover:brightness-110 transition-colors rounded-full">Agendar Diagnóstico</a></motion.div></div></TiltCard></motion.div>)}</AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
