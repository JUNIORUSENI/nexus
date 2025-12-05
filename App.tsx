import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { MissionSelector } from './components/MissionSelector';
import { DynamicForm } from './components/DynamicForm';
import { ConfirmationEcho } from './components/ConfirmationEcho';
import { MissionType, FormData, EchoResponse } from './types';
import { generateEcho } from './services/geminiService';

enum AppStep {
  SELECTION,
  FORM,
  PROCESSING,
  CONFIRMATION
}

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.SELECTION);
  const [selectedMission, setSelectedMission] = useState<MissionType>(MissionType.CONTACT);
  const [finalData, setFinalData] = useState<FormData | null>(null);
  const [echoResponse, setEchoResponse] = useState<EchoResponse | null>(null);

  const handleMissionSelect = (mission: MissionType) => {
    setSelectedMission(mission);
    setStep(AppStep.FORM);
  };

  const handleFormSubmit = async (data: FormData) => {
    setFinalData(data);
    setStep(AppStep.PROCESSING);
    
    // Call Gemini API
    const response = await generateEcho(data);
    setEchoResponse(response);
    setStep(AppStep.CONFIRMATION);
  };

  const handleReset = () => {
    setStep(AppStep.SELECTION);
    setFinalData(null);
    setEchoResponse(null);
  };

  return (
    <Layout>
      {step === AppStep.SELECTION && (
        <MissionSelector onSelect={handleMissionSelect} />
      )}

      {step === AppStep.FORM && (
        <DynamicForm 
          mission={selectedMission} 
          onSubmit={handleFormSubmit}
          onBack={() => setStep(AppStep.SELECTION)} 
        />
      )}

      {step === AppStep.PROCESSING && (
        <div className="text-center space-y-6 animate-in fade-in duration-500">
           <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-nexus-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">🦎</div>
           </div>
           <h2 className="text-xl font-mono text-nexus-accent animate-pulse">
             Axolotl consulte le flux de données...
           </h2>
           <p className="text-slate-500 font-mono text-sm">Chiffrement de la réponse en cours...</p>
        </div>
      )}

      {step === AppStep.CONFIRMATION && echoResponse && finalData && (
        <ConfirmationEcho 
          data={echoResponse} 
          mission={selectedMission}
          userName={finalData.name}
          onReset={handleReset}
        />
      )}
    </Layout>
  );
};

export default App;
