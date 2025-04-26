"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import Image from "next/image";
import MobileNavigation from "../components/MobileNavigation";
import {
  FiHome, FiPieChart, FiActivity, FiAward, FiUser,
  FiCalendar, FiPlus, FiDroplet, FiTarget, FiEdit2 as FiEdit,
  FiInfo, FiCheck, FiClock, FiHeart
} from "react-icons/fi";

type Meal = {
  type: string;
  name: string;
  calories: number;
  registered: boolean;
};

type Achievement = {
  id: number;
  title: string;
  earned: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        router.push("/"); // Se não logado, volta pra Home
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!currentUser) {
    return null; // Evita erro de acessar userData antes do carregamento
  }

  const userData = {
    name: currentUser.displayName || "Usuário",
    photo: currentUser.photoURL || "/ModeloHome.png",
    dailyProgress: {
      calories: { consumed: 1200, goal: 1500 },
      macros: { protein: 80, carbs: 150, fats: 40 },
      water: { consumed: 1.5, goal: 2 },
      nextMeal: { name: "Almoço", time: "12:30", type: "main" },
      burnedCalories: 300,
    },
    meals: [
      { type: "breakfast", name: "Vitamina de Banana", calories: 320, registered: true },
      { type: "lunch", name: "A registrar", calories: 0, registered: false },
      { type: "snack", name: "Iogurte Natural", calories: 150, registered: true },
      { type: "dinner", name: "A registrar", calories: 0, registered: false }
    ] as Meal[],
    achievements: [
      { id: 1, title: "Mestre das Saladas", earned: true },
      { id: 2, title: "3 dias saudáveis", earned: true },
      { id: 3, title: "Meta de Água", earned: false }
    ] as Achievement[],
    weeklyChallenge: {
      title: "5 porções de vegetais",
      progress: 3,
      goal: 5,
      daysLeft: 3,
    },
    tips: [
      "Beba água antes das refeições para melhor digestão",
      "Inclua proteínas em todas as refeições",
    ]
  };

  const caloriesPercentage = Math.min(
    Math.round((userData.dailyProgress.calories.consumed / userData.dailyProgress.calories.goal) * 100),
    100
  );
  const waterPercentage = Math.min(
    Math.round((userData.dailyProgress.water.consumed / userData.dailyProgress.water.goal) * 100),
    100
  );
  const challengePercentage = Math.round(
    (userData.weeklyChallenge.progress / userData.weeklyChallenge.goal) * 100
  );

  const motivationalMessage = caloriesPercentage >= 90
    ? "Excelente! Você está quase lá!"
    : caloriesPercentage >= 70
    ? "Bom trabalho! Continue assim!"
    : `Você consegue! Faltam apenas ${userData.dailyProgress.calories.goal - userData.dailyProgress.calories.consumed} kcal para sua meta!`;

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const renderMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '☕';
      case 'lunch': return '🍲';
      case 'dinner': return '🍽️';
      default: return '🍎';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffde7] to-[#fcdbb5] flex flex-col items-center px-4 pb-20">
      {/* Logo */}
      <div className="pt-10 md:pt-10 mb-7">
        <Image 
          src="/LogoNutrana.svg" 
          alt="NutriPlan Logo" 
          width={200} 
          height={200} 
          priority
          className="mx-auto"
        />
      </div>

      

      {/* Seção do Usuário */}
      <div className="w-full md:max-w-3xl bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-col items-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-green-400 mb-3">
          <Image
            src={userData.photo}
            alt="User"
            width={90}
            height={90}
            className="object-cover"
          />
        </div>
        <h1 className="text-xl font-bold text-green-800">Bem-vindo, {userData.name}!</h1>
        <p className="text-sm text-gray-500 mb-4">Seu plano nutricional personalizado</p>
      </div>


      {/* Navegação (apenas web) */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 w-full md:max-w-3xl mb-6">
  {[
    { path: '/dashboard', icon: <FiHome />, label: 'Início' },
    { path: '/meal-plan', icon: <FiCalendar />, label: 'Refeições' },
    { path: '/progress', icon: <FiActivity />, label: 'Progresso' },
    { path: '/physical-activity', icon: <FiPieChart />, label: 'Atividades' },
    { path: '/achievements', icon: <FiAward />, label: 'Conquistas' },
    { path: '/profile', icon: <FiUser />, label: 'Perfil' },
  ].map((item, index) => (
    <button
      key={index} // ← ISSO é obrigatório
      onClick={() => navigateTo(item.path)} // ← AGORA usando item.path
      className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center hover:bg-green-50 border border-gray-100 transition"
    >
      <div className="text-green-600 mb-2 text-xl">{item.icon}</div> {/* ← usando item.icon */}
      <span className="text-sm font-semibold text-gray-700">{item.label}</span> {/* ← usando item.label */}
    </button>
  ))}
</div>


      {/* Resumo Nutricional */}
      <div className="w-full md:max-w-3xl bg-white rounded-xl shadow-sm p-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Seu Resumo Diário</h2>
        
        {/* Macros */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
            <p className="text-xs text-blue-800 mb-1">Proteínas</p>
            <p className="text-xl font-bold text-blue-600">{userData.dailyProgress.macros.protein}g</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg text-center shadow-sm">
            <p className="text-xs text-yellow-800 mb-1">Carboidratos</p>
            <p className="text-xl font-bold text-yellow-600">{userData.dailyProgress.macros.carbs}g</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center shadow-sm">
            <p className="text-xs text-red-800 mb-1">Gorduras</p>
            <p className="text-xl font-bold text-red-600">{userData.dailyProgress.macros.fats}g</p>
          </div>
        </div>

        {/* Calorias e Água */}
        <div className="space-y-4 mb-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium flex items-center text-gray-700">
                <FiTarget className="mr-2 text-green-600" /> Calorias
              </span>
              <span className="text-sm font-medium">
                {userData.dailyProgress.calories.consumed}/{userData.dailyProgress.calories.goal} kcal
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${caloriesPercentage}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium flex items-center text-gray-700">
                <FiDroplet className="mr-2 text-blue-600" /> Água
              </span>
              <span className="text-sm font-medium">
                {userData.dailyProgress.water.consumed}/{userData.dailyProgress.water.goal} L
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${waterPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Próxima Refeição */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium flex items-center text-orange-800">
              <FiClock className="mr-2 text-orange-600" /> Próxima Refeição
            </h3>
            <span className="text-xs font-medium bg-orange-100 text-orange-800 px-2 py-1 rounded">
              {userData.dailyProgress.nextMeal.time}
            </span>
          </div>
          <p className="text-md font-semibold text-gray-800 mb-3">{userData.dailyProgress.nextMeal.name}</p>
          <button 
  onClick={() => navigateTo('/meal-plan')}
  className="w-full bg-orange-100 text-orange-600 hover:bg-orange-200 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition"
>
  <FiPlus className="mr-2" /> Planejar refeição
</button>
        </div>
      </div>

      {/* Ações Rápidas e Refeições */}
      <div className="w-full md:max-w-3xl bg-white rounded-xl shadow-sm p-4 mb-4">
        {/* Ações Rápidas */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => navigateTo('/meal-plan')}
            className="bg-green-600 text-white p-3 rounded-lg flex flex-col items-center hover:bg-green-700 transition shadow-sm"
          >
            <FiPlus className="mb-2 text-xl" />
            <span className="text-xs font-medium">Registrar Refeição</span>
          </button>
          <button
            onClick={() => navigateTo('/profile')}
            className="bg-white border border-green-600 text-green-600 p-3 rounded-lg flex flex-col items-center hover:bg-green-50 transition shadow-sm"
          >
            <FiEdit className="mb-2 text-xl" />
            <span className="text-xs font-medium">Ajustar Plano</span>
          </button>
          <button
            onClick={() => navigateTo('/tips')}
            className="bg-purple-100 text-purple-800 p-3 rounded-lg flex flex-col items-center hover:bg-purple-200 transition shadow-sm"
          >
            <FiInfo className="mb-2 text-xl" />
            <span className="text-xs font-medium">Dicas do Dia</span>
          </button>
        </div>

        {/* Refeições */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Suas Refeições Hoje</h3>
        <div className="space-y-3">
          {userData.meals.map((meal, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <span className="text-xl mr-3">{renderMealIcon(meal.type)}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {meal.type === 'breakfast' ? 'Café da Manhã' : 
                     meal.type === 'lunch' ? 'Almoço' : 
                     meal.type === 'dinner' ? 'Jantar' : 'Lanche'}
                  </p>
                  <p className="text-xs text-gray-500">{meal.name}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${
                meal.registered ? 'text-green-600' : 'text-gray-400'
              }`}>
                {meal.registered ? `${meal.calories} kcal` : '--'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Atividades e Conquistas */}
      <div className="w-full md:max-w-3xl bg-white rounded-xl shadow-sm p-4 mb-4">
        {/* Atividade Física */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium flex items-center text-blue-800">
              <FiActivity className="mr-2 text-blue-600" /> Atividade Física
            </h3>
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Hoje
            </span>
          </div>
          <p className="text-lg font-bold text-blue-600 mt-2">
            {userData.dailyProgress.burnedCalories} kcal queimadas
          </p>
        </div>

        {/* Conquistas */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Conquistas</h3>
            <button 
              onClick={() => navigateTo('/achievements')}
              className="text-xs text-green-600 hover:underline font-medium"
            >
              Ver todas
            </button>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {userData.achievements.map((achievement) => (
              <div key={achievement.id} className={`flex-shrink-0 p-3 rounded-lg text-center min-w-[100px] ${
                achievement.earned ? 'bg-yellow-100 shadow-sm' : 'bg-gray-100 opacity-70'
              }`}>
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  achievement.earned ? 'bg-yellow-200 text-yellow-600' : 'bg-gray-200 text-gray-400'
                }`}>
                  <FiAward className="text-xl" />
                </div>
                <p className="text-xs font-medium">{achievement.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desafio Semanal */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium flex items-center text-purple-800">
              <FiAward className="mr-2 text-purple-600" /> Desafio Semanal
            </h3>
            <span className="text-xs text-purple-800 font-medium">
              {userData.weeklyChallenge.daysLeft} dias restantes
            </span>
          </div>
          <p className="text-md font-medium text-gray-800 mb-3">{userData.weeklyChallenge.title}</p>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${challengePercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">
              {userData.weeklyChallenge.progress}/{userData.weeklyChallenge.goal}
            </span>
          </div>
        </div>
      </div>

      {/* Mensagem Motivacional */}
      <div className="w-full md:max-w-3xl bg-gradient-to-r from-pink-100 to-pink-50 px-6 py-6 rounded-lg shadow-sm mb-4 border border-pink-200">
        <div className="flex flex-col items-center text-center">
          <div className="bg-pink-500 rounded-full p-3 mb-3 shadow-md">
            <FiHeart className="text-white text-xl" />
          </div>
          <p className="text-pink-700 text-lg font-medium">
            {motivationalMessage}
          </p>
        </div>
      </div>

      {/* Suporte Nutricional */}
      <div className="w-full md:max-w-3xl bg-white p-4 rounded-lg shadow-sm mb-6 text-center border border-green-100">
        <button 
          onClick={() => navigateTo('/support')}
          className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center justify-center w-full"
        >
          <FiInfo className="mr-2" /> Precisa de ajuda? Fale com um nutricionista
        </button>
      </div>

      {/* Rodapé */}
      <footer className="text-center text-gray-500 text-xs mb-4">
        <button 
          onClick={() => router.push('/')}
          className="text-green-600 hover:underline px-2 py-1 rounded"
        >
          ← Voltar ao início
        </button>
      </footer>

      {/* Menu Mobile */}
      <MobileNavigation />
    </div>
  );
}