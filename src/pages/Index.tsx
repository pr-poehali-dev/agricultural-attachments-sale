import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

const products = [
  {
    id: 1,
    name: "Ковш погрузчика КП-2500",
    category: "Ковши",
    price: 185000,
    compatibility: ["МТЗ-82", "ЮМЗ-6", "Т-40"],
    volume: "2.5 м³",
    weight: "450 кг",
    material: "Сталь 09Г2С",
    image: "https://cdn.poehali.dev/projects/e3e0c611-b2ec-4ca5-900c-89179b8da5e8/files/092eb8e7-a6e9-47d7-9260-24cd53e31e51.jpg",
    description: "Универсальный ковш для погрузчика с усиленной конструкцией",
    specs: {
      capacity: "2.5 м³",
      width: "2400 мм",
      height: "1200 мм",
      workingLoad: "1500 кг"
    }
  },
  {
    id: 2,
    name: "Вилы паллетные ВП-1200",
    category: "Вилы",
    price: 95000,
    compatibility: ["МТЗ-82", "Беларус 920"],
    volume: "N/A",
    weight: "180 кг",
    material: "Сталь 40Х",
    image: "https://cdn.poehali.dev/projects/e3e0c611-b2ec-4ca5-900c-89179b8da5e8/files/38db3ec0-70e4-44a0-954c-157917a1aad8.jpg",
    description: "Паллетные вилы для работы с поддонами и грузами",
    specs: {
      length: "1200 мм",
      width: "150 мм",
      thickness: "50 мм",
      workingLoad: "2000 кг"
    }
  },
  {
    id: 3,
    name: "Щетка дорожная ЩД-2000",
    category: "Щетки",
    price: 145000,
    compatibility: ["МТЗ-82", "ЮМЗ-6", "Т-25"],
    volume: "N/A",
    weight: "320 кг",
    material: "Полипропилен + Сталь",
    image: "https://cdn.poehali.dev/projects/e3e0c611-b2ec-4ca5-900c-89179b8da5e8/files/1966b6ef-6ad7-45db-bae7-74531b7af99a.jpg",
    description: "Дорожная щетка для уборки территорий круглый год",
    specs: {
      width: "2000 мм",
      diameter: "700 мм",
      bristleType: "Полипропилен",
      rotation: "Гидравлический привод"
    }
  },
  {
    id: 4,
    name: "Ковш для сыпучих материалов КС-3000",
    category: "Ковши",
    price: 210000,
    compatibility: ["МТЗ-82", "Беларус 920", "ЮМЗ-6"],
    volume: "3.0 м³",
    weight: "520 кг",
    material: "Сталь 09Г2С",
    image: "https://cdn.poehali.dev/projects/e3e0c611-b2ec-4ca5-900c-89179b8da5e8/files/092eb8e7-a6e9-47d7-9260-24cd53e31e51.jpg",
    description: "Увеличенный ковш для работы с зерном и сыпучими материалами",
    specs: {
      capacity: "3.0 м³",
      width: "2600 мм",
      height: "1400 мм",
      workingLoad: "1800 кг"
    }
  },
  {
    id: 5,
    name: "Вилы для рулонов ВР-1500",
    category: "Вилы",
    price: 125000,
    compatibility: ["МТЗ-82", "Т-40"],
    volume: "N/A",
    weight: "250 кг",
    material: "Сталь 40Х",
    image: "https://cdn.poehali.dev/projects/e3e0c611-b2ec-4ca5-900c-89179b8da5e8/files/38db3ec0-70e4-44a0-954c-157917a1aad8.jpg",
    description: "Специализированные вилы для работы с сеном в рулонах",
    specs: {
      length: "1500 мм",
      diameter: "100 мм",
      grip: "Зажим гидравлический",
      workingLoad: "1200 кг"
    }
  },
  {
    id: 6,
    name: "Отвал снегоуборочный ОС-2500",
    category: "Отвалы",
    price: 165000,
    compatibility: ["МТЗ-82", "Беларус 920", "ЮМЗ-6"],
    volume: "N/A",
    weight: "380 кг",
    material: "Сталь 3 с резиновой кромкой",
    image: "https://cdn.poehali.dev/projects/e3e0c611-b2ec-4ca5-900c-89179b8da5e8/files/092eb8e7-a6e9-47d7-9260-24cd53e31e51.jpg",
    description: "Снегоуборочный отвал с регулируемым углом наклона",
    specs: {
      width: "2500 мм",
      height: "800 мм",
      angle: "±30°",
      edgeType: "Резиновая усиленная"
    }
  }
];

const reviews = [
  {
    id: 1,
    name: "Александр П.",
    company: "АгроХолдинг",
    rating: 5,
    text: "Приобрели ковш КП-2500 для МТЗ-82. Отличное качество изготовления, работает уже полгода без нареканий. Особенно порадовала усиленная конструкция.",
    date: "15.11.2024"
  },
  {
    id: 2,
    name: "Дмитрий В.",
    company: "СтройМаш",
    rating: 5,
    text: "Заказывали паллетные вилы и щетку дорожную. Доставка точно в срок, монтаж без проблем. Рекомендую!",
    date: "02.11.2024"
  },
  {
    id: 3,
    name: "Сергей М.",
    company: "Фермерское хозяйство",
    rating: 4,
    text: "Хорошее соотношение цены и качества. Вилы для рулонов работают отлично, удобная система зажима.",
    date: "28.10.2024"
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCompatibility, setSelectedCompatibility] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 300000]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const compatibilityMatch = selectedCompatibility === "all" || product.compatibility.includes(selectedCompatibility);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && compatibilityMatch && priceMatch;
  });

  const uniqueCompatibility = Array.from(new Set(products.flatMap(p => p.compatibility)));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-accent text-accent-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="Truck" size={32} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">АгроТехМаш</h1>
                <p className="text-sm text-accent-foreground/80">Навесное оборудование</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors font-medium">Каталог</a>
              <a href="#about" className="hover:text-primary transition-colors font-medium">О компании</a>
              <a href="#delivery" className="hover:text-primary transition-colors font-medium">Доставка</a>
              <a href="#reviews" className="hover:text-primary transition-colors font-medium">Отзывы</a>
              <a href="#contacts" className="hover:text-primary transition-colors font-medium">Контакты</a>
            </nav>
            <Button size="lg" className="hidden md:flex">
              <Icon name="Phone" className="mr-2" size={20} />
              Связаться
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-lg px-6 py-2">Прямые поставки от производителя</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Навесное оборудование для спецтехники
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ковши, вилы, щетки, отвалы и другое оборудование для тракторов и погрузчиков. 
              Гарантия качества, доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Icon name="ShoppingCart" className="mr-2" size={20} />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Calculator" className="mr-2" size={20} />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Каталог оборудования</h2>
          
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Filter" size={24} />
                    Фильтры
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Тип оборудования</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все категории" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        <SelectItem value="Ковши">Ковши</SelectItem>
                        <SelectItem value="Вилы">Вилы</SelectItem>
                        <SelectItem value="Щетки">Щетки</SelectItem>
                        <SelectItem value="Отвалы">Отвалы</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Совместимость с техникой</label>
                    <Select value={selectedCompatibility} onValueChange={setSelectedCompatibility}>
                      <SelectTrigger>
                        <SelectValue placeholder="Вся техника" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Вся техника</SelectItem>
                        {uniqueCompatibility.map((comp) => (
                          <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={300000}
                      step={5000}
                      className="mt-4"
                    />
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedCompatibility("all");
                      setPriceRange([0, 300000]);
                    }}
                  >
                    <Icon name="X" className="mr-2" size={16} />
                    Сбросить фильтры
                  </Button>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Найдено товаров: <span className="font-bold text-foreground">{filteredProducts.length}</span>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Badge className="mb-3">{product.category}</Badge>
                      <CardTitle className="mb-2 text-xl">{product.name}</CardTitle>
                      <CardDescription className="mb-4">{product.description}</CardDescription>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="Weight" size={16} />
                          <span>Вес: {product.weight}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="Package" size={16} />
                          <span>Материал: {product.material}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.compatibility.map((comp) => (
                          <Badge key={comp} variant="outline" className="text-xs">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-0">
                      <div>
                        <p className="text-3xl font-bold text-primary">
                          {product.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedProduct(product)}>
                            Подробнее
                            <Icon name="ArrowRight" className="ml-2" size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                            <DialogDescription>{product.description}</DialogDescription>
                          </DialogHeader>
                          
                          <Tabs defaultValue="specs" className="mt-6">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="specs">Характеристики</TabsTrigger>
                              <TabsTrigger value="gallery">Галерея</TabsTrigger>
                              <TabsTrigger value="tech">Технические данные</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="specs" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Категория</p>
                                  <p className="font-medium">{product.category}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Вес</p>
                                  <p className="font-medium">{product.weight}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Материал</p>
                                  <p className="font-medium">{product.material}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Цена</p>
                                  <p className="font-bold text-primary text-xl">{product.price.toLocaleString()} ₽</p>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Совместимость</p>
                                <div className="flex flex-wrap gap-2">
                                  {product.compatibility.map((comp) => (
                                    <Badge key={comp} variant="secondary">{comp}</Badge>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="gallery">
                              <div className="grid grid-cols-2 gap-4">
                                <img src={product.image} alt={product.name} className="rounded-lg w-full" />
                                <img src={product.image} alt={product.name} className="rounded-lg w-full" />
                                <img src={product.image} alt={product.name} className="rounded-lg w-full" />
                                <img src={product.image} alt={product.name} className="rounded-lg w-full" />
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="tech" className="space-y-4">
                              {Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center border-b pb-2">
                                  <span className="text-muted-foreground capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </TabsContent>
                          </Tabs>

                          <div className="flex gap-3 mt-6">
                            <Button className="flex-1" size="lg">
                              <Icon name="ShoppingCart" className="mr-2" />
                              Заказать
                            </Button>
                            <Button variant="outline" size="lg">
                              <Icon name="Phone" className="mr-2" />
                              Позвонить
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <Card className="p-12 text-center">
                  <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-2xl font-bold mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">О компании</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-3">
                    <Icon name="Award" size={32} className="text-primary" />
                  </div>
                  <CardTitle>15 лет на рынке</CardTitle>
                  <CardDescription>
                    Производим и поставляем навесное оборудование с 2009 года. 
                    За это время накопили огромный опыт и завоевали доверие тысяч клиентов.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-secondary/10 p-3 rounded-lg w-fit mb-3">
                    <Icon name="Shield" size={32} className="text-secondary" />
                  </div>
                  <CardTitle>Гарантия качества</CardTitle>
                  <CardDescription>
                    Используем только качественные материалы и современное оборудование. 
                    Предоставляем гарантию на всю продукцию от 12 до 24 месяцев.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-3">
                    <Icon name="Factory" size={32} className="text-primary" />
                  </div>
                  <CardTitle>Собственное производство</CardTitle>
                  <CardDescription>
                    Имеем собственные производственные мощности, что позволяет контролировать качество 
                    на всех этапах и предлагать конкурентные цены.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-secondary/10 p-3 rounded-lg w-fit mb-3">
                    <Icon name="Users" size={32} className="text-secondary" />
                  </div>
                  <CardTitle>Индивидуальный подход</CardTitle>
                  <CardDescription>
                    Поможем подобрать оборудование под ваши задачи. Возможно изготовление 
                    нестандартных решений по индивидуальным параметрам.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Доставка и оплата</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Icon name="Truck" size={24} className="text-primary" />
                    Способы доставки
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Собственной транспортной службой по Московской области</li>
                    <li>Транспортными компаниями по всей России (ПЭК, Деловые Линии, КИТ)</li>
                    <li>Самовывоз со склада в Подмосковье</li>
                    <li>Срок доставки: 3-7 дней в зависимости от региона</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                    Способы оплаты
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Безналичный расчет для юридических лиц (с НДС и без НДС)</li>
                    <li>Наличный расчет при самовывозе</li>
                    <li>Оплата картой на сайте</li>
                    <li>Возможна рассрочка для постоянных клиентов</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Icon name="FileCheck" size={24} className="text-primary" />
                    Гарантия и возврат
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Гарантия на все оборудование от 12 до 24 месяцев</li>
                    <li>Возврат в течение 14 дней при сохранении товарного вида</li>
                    <li>Бесплатный гарантийный ремонт</li>
                    <li>Техническая поддержка на весь срок эксплуатации</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Отзывы клиентов</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.company}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-foreground/80">
                    "{review.text}"
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              <Icon name="MessageSquare" className="mr-2" />
              Оставить отзыв
            </Button>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Контакты</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/90">
                <CardHeader>
                  <CardTitle>Связаться с нами</CardTitle>
                  <CardDescription>Мы работаем ежедневно с 8:00 до 20:00</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <Icon name="Mail" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@agrotechmash.ru</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">Московская обл., г. Подольск, ул. Производственная, 15</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/90">
                <CardHeader>
                  <CardTitle>Быстрая заявка</CardTitle>
                  <CardDescription>Оставьте заявку и мы перезвоним в течение 15 минут</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  />
                  <input 
                    type="tel" 
                    placeholder="Телефон" 
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  />
                  <textarea 
                    placeholder="Комментарий (необязательно)" 
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background resize-none"
                  />
                  <Button className="w-full" size="lg">
                    <Icon name="Send" className="mr-2" />
                    Отправить заявку
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-accent text-accent-foreground py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="Truck" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold">АгроТехМаш</p>
                <p className="text-sm text-muted-foreground">© 2024 Все права защищены</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
