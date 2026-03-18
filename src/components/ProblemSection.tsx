import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Bug, Quote, AlertTriangle, MousePointer2, RefreshCw, Lightbulb, FileText, Activity, Brain, Target, BarChart, Lock, ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

export function ProblemSection() {
  const [selectedStage, setSelectedStage] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const sectionRef = useRef<any>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const quotes = [
    "\"Você contratou os melhores profissionais. Mas eles gastam 60% do tempo em tarefas repetitivas que nem deveriam existir. O problema não é talento — é processo.\"",
    "\"Escalar não é sobre contratar mais pessoas. É sobre extrair o máximo de inteligência da sua operação atual através de fluxos validados.\"",
    "\"Decisões baseadas em intuição custam caro. Empresas líderes usam dados estruturados e pipelines de IA para garantir precisão cirúrgica.\""
  ];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        // Map scroll progress 0-1 to 0-6 (7 stages)
        const newStage = Math.min(6, Math.max(0, Math.floor(v * 7)));
        setSelectedStage(newStage);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleManualSelect = (index: number) => {
    // Optional: smooth scroll to that portion of the section
    setSelectedStage(index);
  };
  const stages = [
    { id: 1, icon: Lightbulb, title: "1. Processos Manuais", desc: "Equipe executa tarefas repetitivas sem automação." },
    { id: 2, icon: FileText, title: "2. Documentação Desestruturada", desc: "Relatórios, propostas e documentos sem padrão." },
    { id: 3, icon: Activity, title: "3. Gargalos de Back-office", desc: "Operações internas consomem tempo e recursos." },
    { id: 4, icon: Brain, title: "4. IA sem Alinhamento (Risco)", desc: "Ferramentas de IA geram alucinações e erros." },
    { id: 5, icon: Target, title: "5. Escala Travada", desc: "Crescimento limitado pela dependência de pessoas." },
    { id: 6, icon: BarChart, title: "6. Custos Operacionais Altos", desc: "Retrabalho e ineficiência drenam o orçamento." },
    { id: 7, icon: Lock, title: "7. ESTAGNAÇÃO", desc: "Sem IA, a empresa perde competitividade.", isTerminal: true }
  ];
  const feedbackMessages = [
    "Reconhecer processos manuais é o primeiro passo. A automação inteligente elimina retrabalho e libera sua equipe.",
    "Documentos sem padrão geram risco. Vamos estruturar sua base de conhecimento com IA para garantir consistência.",
    "Gargalos de back-office são invisíveis até que drenem seu caixa. Hora de reestruturar com fluxos autônomos.",
    "IA sem alinhamento é um risco corporativo. Aplico RLHF e LLM Alignment para garantir precisão absoluta.",
    "Escalar exige automação. Vamos criar sistemas que operam sem dependência de pessoas específicas.",
    "Custos altos são sintoma de processos ineficientes. A IA aplicada reduz custos operacionais drasticamente.",
    "A estagnação é reversível. Uma intervenção estratégica com IA pode transformar sua operação agora."
  ];

  return (
    <section ref={sectionRef} id="problem" style={{ backgroundColor: '#050505' }} className="relative z-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        
        {/* COLUNA ESQUERDA - PARALLAX CONTÍNUO */}
        <div className="flex flex-col relative overflow-hidden">
          
          {/* Background fixo espelhado da Hero (continuidade) */}
          <div 
            className="absolute inset-0 z-0 bg-no-repeat bg-[75%_5%] md:bg-[left_center] bg-fixed bg-[length:768px_512px] md:bg-[length:1125px_auto]" 
            style={{ 
              backgroundImage: `url('https://i.postimg.cc/fTr2CQYp/hero_bg.jpg')`
            }} 
          />

          {/* OVERLAY ESCURO 1 - Reduzido para deixar imagem mais visível */}
          <div className="relative z-10 p-8 lg:p-20 bg-black/30 backdrop-blur-[1px]">
            <FadeIn><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111]/80 border border-white/10 mb-8"><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Bug className="w-4 h-4 text-[#E8272A]" /></motion.div><span className="text-xs font-medium tracking-wide text-white uppercase">Diagnóstico Operacional</span></div></FadeIn>
            <FadeIn delay={0.1}><h2 className="text-4xl lg:text-6xl font-display font-medium tracking-tighter text-white leading-[1.1] max-w-lg mb-6">Sua operação está <span className="text-[#E8272A]">drenando seu crescimento?</span></h2></FadeIn>
            <FadeIn delay={0.2}><p className="text-base lg:text-lg text-white font-light max-w-md leading-relaxed">Sua empresa investe tempo e dinheiro em operações repetitivas. Documentos são redigidos manualmente, processos geram gargalos e a equipe gasta horas em tarefas que poderiam ser automatizadas com IA.</p></FadeIn>
          </div>

          {/* OVERLAY ESCURO 2 - Transição suave para preto */}
          <div className="relative z-10 flex-1 min-h-[300px] p-8 lg:p-20 lg:pb-[140px] flex flex-col justify-end bg-black/50 backdrop-blur-[2px]">
            <motion.div className="absolute top-8 right-8 opacity-50" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><Quote className="w-16 h-16 text-white" /></motion.div>
            <FadeIn delay={0.3} direction="right">
              <div className="relative z-10 border-l-2 border-[#E8272A] pl-6 md:pl-8 py-2 min-h-[140px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-justify text-xl md:text-2xl lg:text-[2rem] max-w-2xl text-white font-light leading-snug"
                  >
                    {quotes[quoteIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>

        </div>

        {/* COLUNA DIREITA - Interativa vermelha */}
        <div className="flex flex-col h-full bg-[#E8272A] relative z-10">
          <div className="p-8 lg:p-16 border-b border-white/10 bg-black/10 relative overflow-hidden min-h-[250px] flex flex-col justify-center">
            <AlertTriangle className="w-32 h-32 text-white absolute top-8 right-8 opacity-10" />
            <div className="relative z-10 w-full">
              {selectedStage === null ? <span className="inline-flex items-center gap-2 text-white font-medium uppercase text-xs tracking-widest border border-white/20 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm"><MousePointer2 className="w-4 h-4" />Selecione um gargalo abaixo</span> : <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={selectedStage}><p className="text-white font-medium text-2xl lg:text-3xl mb-4 leading-relaxed max-w-lg tracking-tight">{feedbackMessages[selectedStage]}</p><div className="flex items-center gap-2 text-white text-xs font-medium uppercase tracking-widest mt-6"><RefreshCw className="w-4 h-4 animate-spin" />Analisando solução...</div></motion.div>}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            {stages.map((s, index) => (
              <motion.div 
                key={s.id} 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ margin: "-20%", once: false }}
                onViewportEnter={() => { if(typeof window !== 'undefined' && window.innerWidth < 1024) setSelectedStage(index) }}
                onClick={() => handleManualSelect(index)} 
                whileHover={{ x: 10 }} 
                className={`group relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 lg:px-12 border-b border-white/10 transition-all cursor-pointer gap-4 ${selectedStage === index ? 'bg-black/20 border-l-2 border-[#E8272A]' : 'hover:bg-black/10 border-l-2 border-transparent'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <div className="flex items-center gap-6 w-full sm:w-auto relative z-10">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full border transition-colors ${selectedStage === index ? 'bg-white border-white' : 'bg-transparent border-white/20'}`}>
                    <s.icon className={`w-5 h-5 ${selectedStage === index ? 'text-[#E8272A]' : 'text-white'}`} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium tracking-tight text-white">{s.title}</h4>
                    <p className="text-sm text-white mt-1 max-w-[280px] font-light">{s.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-1 sm:justify-end gap-6 relative z-10">
                  {s.isTerminal && <span className="text-[10px] font-medium text-white tracking-widest uppercase px-3 py-1.5 border border-white/20 bg-white/10 rounded-full">CRÍTICO</span>}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${selectedStage === index ? 'bg-white text-[#E8272A]' : 'border-white/20 text-white hover:bg-white/20'}`}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
