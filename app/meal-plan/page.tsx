'use client';
import MobileNavigation from '@/components/MobileNavigation';
import { useRouter } from 'next/navigation';
import { 
  FiHome,
  FiCalendar,
  FiPlus,
  FiChevronLeft,
  FiClock,
  FiEdit,
  FiCheck,
  FiX
} from "react-icons/fi";
import Image from "next/image";

type Meal = {
  id: number;
  type: string;
  name: string;
  time: string;
  calories: number;
  registered: boolean;
  ingredients: string[];
};

export default function MealPlanPage() {
  const router = useRouter();

  // Dados mockados
  const mealsData = {
    today: [
      {
        id: 1,
        type: "breakfast",
        name: "Vitamina de Banana com Aveia",
        time: "08:30",
        calories: 320,
        registered: true,
        ingredients: ["Banana", "Aveia", "Leite", "Mel"]
      },
      {
        id: 2,
        type: "lunch",
        name: "Salada de Quinoa com Frango Grelhado",
        time: "12:30",
        calories: 450,
        registered: false,
        ingredients: ["Quinoa", "Frango", "Tomate", "Pepino", "Abacate"]
      },
      {
        id: 3,
        type: "snack",
        name: "Iogurte Natural com Granola",
        time: "16:00",
        calories: 180,
        registered: true,
        ingredients: ["Iogurte natural", "Granola", "Mel"]
      },
      {
        id: 4,
        type: "dinner",
        name: "Sopa de Legumes com Gengibre",
        time: "20:00",
        calories: 280,
        registered: false,
        ingredients: ["Abóbora", "Cenoura", "Batata", "Gengibre", "Coentro"]
      }
    ] as Meal[],
    upcoming: [
      {
        id: 5,
        type: "breakfast",
        name: "Omelete de Espinafre com Queijo Feta",
        time: "08:00",
        calories: 290,
        registered: false,
        ingredients: ["Ovos", "Espinafre", "Queijo Feta", "Tomate Cereja"]
      }
    ] as Meal[]
  };

  const renderMealIcon = (mealType: string) => {
    const icons = {
      'breakfast': '🥑',
      'lunch': '🍲', 
      'dinner': '🍽️',
      'snack': '🍓'
    };
    return icons[mealType as keyof typeof icons] || '🍴';
  };

  const getMealTypeName = (type: string) => {
    const names = {
      'breakfast': 'Café da Manhã',
      'lunch': 'Almoço',
      'dinner': 'Jantar',
      'snack': 'Lanche'
    };
    return names[type as keyof typeof names] || 'Refeição';
  };

  const handleRegisterMeal = (mealId: number) => {
    console.log(`Meal ${mealId} registered`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffde7] to-[#fcdbb5] flex flex-col items-center px-4 pb-20">
      {/* Cabeçalho Moderno */}
      <div className="w-full max-w-3xl flex justify-between items-center py-6 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <button 
          onClick={() => router.back()}
          className="text-gray-700 hover:text-gray-900 flex items-center transition-colors"
        >
          <FiChevronLeft className="mr-1 text-lg" />
          <span className="text-sm font-medium">Voltar</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Plano Nutricional</h1>
        <button 
          onClick={() => router.push('/add-meal')}
          className="bg-gradient-to-r from-green-500 to-teal-400 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <FiPlus className="text-lg" />
        </button>
      </div>

      {/* Abas */}
      <div className="w-full max-w-3xl mb-6">
        <div className="flex border-b border-gray-200">
          <button className="flex-1 py-3 px-4 text-center font-medium text-sm border-b-2 border-green-500 text-green-600">
            Hoje
          </button>
          <button className="flex-1 py-3 px-4 text-center font-medium text-sm text-gray-500 hover:text-gray-700">
            Próximos Dias
          </button>
          <button className="flex-1 py-3 px-4 text-center font-medium text-sm text-gray-500 hover:text-gray-700">
            Favoritos
          </button>
        </div>
      </div>

      {/* Seção de Refeições de Hoje */}
      <div className="w-full max-w-3xl space-y-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 px-2">Refeições de Hoje</h2>
        
        {mealsData.today.map((meal) => (
          <div 
            key={meal.id} 
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-600 rounded-lg p-3 flex items-center justify-center">
                <span className="text-2xl">{renderMealIcon(meal.type)}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-medium text-gray-500">{getMealTypeName(meal.type)}</span>
                    <h3 className="font-semibold text-gray-800 mt-1">{meal.name}</h3>
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    meal.registered 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {meal.calories} kcal
                  </span>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <FiClock className="mr-1" />
                    <span>{meal.time}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {meal.ingredients.slice(0, 3).map((ingredient, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded-full border border-gray-200"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {meal.ingredients.length > 3 && (
                      <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded-full">
                        +{meal.ingredients.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              {meal.registered ? (
                <button 
                  className="flex items-center text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg"
                  disabled
                >
                  <FiCheck className="mr-2" /> Registrado
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => console.log(`Edit meal ${meal.id}`)}
                    className="flex items-center text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <FiEdit className="mr-2" /> Editar
                  </button>
                  <button 
                    onClick={() => handleRegisterMeal(meal.id)}
                    className="flex items-center text-sm text-white bg-gradient-to-r from-green-500 to-teal-400 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <FiCheck className="mr-2" /> Registrar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Seção de Próximas Refeições */}
      <div className="w-full max-w-3xl">
        <h2 className="text-lg font-semibold text-gray-800 px-2 mb-4">Próximas Refeições</h2>
        
        {mealsData.upcoming.length > 0 ? (
          <div className="space-y-4">
            {mealsData.upcoming.map((meal) => (
              <div 
                key={meal.id} 
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-lg p-3 flex items-center justify-center">
                    <span className="text-2xl">{renderMealIcon(meal.type)}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-medium text-gray-500">{getMealTypeName(meal.type)}</span>
                        <h3 className="font-semibold text-gray-800 mt-1">{meal.name}</h3>
                      </div>
                      <span className="text-sm font-medium text-gray-500 px-2 py-1 rounded-full bg-gray-100">
                        {meal.calories} kcal
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <FiClock className="mr-1" />
                        <span>{meal.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end gap-2">
                  <button 
                    onClick={() => console.log(`Cancel meal ${meal.id}`)}
                    className="flex items-center text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <FiX className="mr-2" /> Cancelar
                  </button>
                  <button 
                    onClick={() => router.push(`/edit-meal/${meal.id}`)}
                    className="flex items-center text-sm text-white bg-gradient-to-r from-blue-500 to-indigo-400 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <FiEdit className="mr-2" /> Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiCalendar className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">Nenhuma refeição planejada</h3>
            <p className="text-gray-500 text-sm mb-4">Adicione refeições para os próximos dias</p>
            <button 
              onClick={() => router.push('/add-meal')}
              className="bg-gradient-to-r from-green-500 to-teal-400 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all inline-flex items-center"
            >
              <FiPlus className="mr-2" /> Planejar Refeição
            </button>
          </div>
        )}
      </div>

      {/* Menu Mobile */}
      <MobileNavigation />
    </div>
  );
}