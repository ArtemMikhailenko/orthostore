import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt for the AI assistant
const SYSTEM_PROMPT = `Ти AI-асистент інтернет-магазину ортодонтичних товарів OrthoDent Pro. 

Контекст про магазин:
- Продаємо ортодонтичну продукцію: брекети, дуги, елайнери, еластики, інструменти
- Працюємо з провідними брендами: Ormco, American Orthodontics, 3M Unitek, Ortho Technology
- Доставка по всій Україні (Нова Пошта, Укрпошта, кур'єр)
- Безкоштовна доставка від 5000 ₴
- Діють знижки до 20%

Приблизні ціни:
- Брекети металеві: 12 000 - 18 000 ₴
- Брекети керамічні: 18 000 - 25 000 ₴
- Елайнери: 45 000 - 65 000 ₴
- Дуги NiTi: 350 - 800 ₴
- Еластики: 150 - 300 ₴

Твоє завдання:
✅ Відповідай на українській мові
✅ Будь професійним, але дружнім
✅ Давай конкретні відповіді з цінами та характеристиками
✅ Рекомендуй товари на основі потреб клієнта
✅ Використовуй емодзі для дружності 🦷✨
✅ Пропонуй додаткові товари або послуги
✅ Якщо не знаєш відповіді - пропонуй зв'язатися з менеджером

Відповідай коротко та по суті (до 150 слів).`;

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!GROQ_API_KEY) {
      console.warn('GROQ_API_KEY not configured, using fallback response');
      return NextResponse.json({
        response: getFallbackResponse(message),
      });
    }

    // Build conversation history for context
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(conversationHistory || []).map((msg: Message) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user', content: message },
    ];

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Fast and free model
        messages: messages,
        temperature: 0.7,
        max_tokens: 300,
        top_p: 1,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error:', errorData);
      return NextResponse.json({
        response: getFallbackResponse(message),
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || getFallbackResponse(message);

    return NextResponse.json({
      response: aiResponse,
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { response: 'Вибачте, сталася помилка. Спробуйте ще раз або зв\'яжіться з підтримкою.' },
      { status: 500 }
    );
  }
}

// Fallback responses when API is not available
function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('ціна') || lowerMessage.includes('кошт') || lowerMessage.includes('скільки')) {
    return 'Ціни на нашу продукцію варіюються в залежності від типу:\n\n• Брекети: 12 000 - 22 000 ₴\n• Дуги: 350 - 800 ₴\n• Елайнери: 45 000 - 65 000 ₴\n\nУ нас діють акції та знижки до 20%! Що саме вас цікавить?';
  }
  
  if (lowerMessage.includes('доставк') || lowerMessage.includes('відправ')) {
    return 'Доставка працює по всій Україні:\n\n🚚 Нова Пошта - від 1 дня\n🚚 Укрпошта - 2-5 днів\n🚚 Кур\'єр по Києву - в той же день\n\n✅ Безкоштовна доставка від 5000 ₴';
  }

  if (lowerMessage.includes('брекет')) {
    return 'У нас великий вибір брекет-систем! 🦷\n\n**Металеві:**\n• Damon Q (Ormco) - 15 500 ₴\n• American Orthodontics - 12 000 ₴\n\n**Керамічні:**\n• Clarity (3M) - 22 000 ₴\n\nВсі з сертифікатами FDA. Що вас цікавить більше?';
  }

  if (lowerMessage.includes('дякую') || lowerMessage.includes('спасибі')) {
    return 'Завжди радий допомогти! 😊 Якщо виникнуть питання - звертайтесь. Бажаю успішної роботи! 🦷✨';
  }
  
  return 'Дякую за ваше питання! 😊\n\nДля детальної консультації рекомендую:\n• Переглянути наш каталог\n• Зв\'язатися з менеджером: +380 50 123 45 67\n• Написати на email: orthostore.com.ua@gmail.com\n\nЧим ще можу допомогти?';
}
