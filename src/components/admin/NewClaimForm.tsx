
import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Claim } from "@/hooks/use-claims";

// Схема валидации для формы
const newClaimSchema = z.object({
  customer: z.string().min(3, "Имя клиента обязательно"),
  email: z.string().email("Требуется действительный email"),
  airline: z.string().min(1, "Авиакомпания обязательна"),
  flight_number: z.string().min(1, "Номер рейса обязателен"),
  departure_date: z.date(),
  amount: z.string().min(1, "Сумма обязательна"),
  disruption_type: z.string().min(1, "Тип сбоя обязателен"),
  departure_airport: z.string().min(1, "Аэропорт вылета обязателен"),
  arrival_airport: z.string().min(1, "Аэропорт прибытия обязателен"),
  notes: z.string().optional(),
});

type NewClaimFormProps = {
  onSubmit: (claimData: Omit<Claim, 'id' | 'created_at' | 'last_updated' | 'status' | 'stage'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

const NewClaimForm = ({ onSubmit, onCancel, isSubmitting = false }: NewClaimFormProps) => {
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    airline: "",
    flight_number: "",
    departure_date: new Date(),
    amount: "",
    disruption_type: "delay",
    departure_airport: "",
    arrival_airport: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Валидируем данные
      newClaimSchema.parse(formData);
      
      // Создаем объект с данными нового запроса
      const newClaim = {
        customer: formData.customer,
        email: formData.email,
        airline: formData.airline,
        flight_number: formData.flight_number,
        departure_date: format(formData.departure_date, "yyyy-MM-dd"),
        amount: formData.amount.startsWith("€") ? formData.amount : `€${formData.amount}`,
        disruption_type: formData.disruption_type,
        departure_airport: formData.departure_airport,
        arrival_airport: formData.arrival_airport,
        notes: formData.notes,
      };

      onSubmit(newClaim);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path) {
            newErrors[error.path[0].toString()] = error.message;
          }
        });
        setErrors(newErrors);
        
        toast.error("Пожалуйста, исправьте ошибки в форме");
      } else {
        toast.error("Произошла ошибка при создании заявки");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customer">Имя клиента</Label>
        <Input
          id="customer"
          value={formData.customer}
          onChange={(e) => handleChange("customer", e.target.value)}
          placeholder="Введите имя клиента"
        />
        {errors.customer && <p className="text-sm text-red-500">{errors.customer}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="client@example.com"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departure_airport">Аэропорт вылета</Label>
          <Input
            id="departure_airport"
            value={formData.departure_airport}
            onChange={(e) => handleChange("departure_airport", e.target.value)}
            placeholder="напр. FRA"
          />
          {errors.departure_airport && <p className="text-sm text-red-500">{errors.departure_airport}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="arrival_airport">Аэропорт прибытия</Label>
          <Input
            id="arrival_airport"
            value={formData.arrival_airport}
            onChange={(e) => handleChange("arrival_airport", e.target.value)}
            placeholder="напр. CDG"
          />
          {errors.arrival_airport && <p className="text-sm text-red-500">{errors.arrival_airport}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="airline">Авиакомпания</Label>
          <Select
            value={formData.airline}
            onValueChange={(value) => handleChange("airline", value)}
          >
            <SelectTrigger id="airline">
              <SelectValue placeholder="Выберите авиакомпанию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lufthansa">Lufthansa</SelectItem>
              <SelectItem value="British Airways">British Airways</SelectItem>
              <SelectItem value="Air France">Air France</SelectItem>
              <SelectItem value="Ryanair">Ryanair</SelectItem>
              <SelectItem value="EasyJet">EasyJet</SelectItem>
              <SelectItem value="Eurowings">Eurowings</SelectItem>
              <SelectItem value="KLM">KLM</SelectItem>
            </SelectContent>
          </Select>
          {errors.airline && <p className="text-sm text-red-500">{errors.airline}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="flight_number">Номер рейса</Label>
          <Input
            id="flight_number"
            value={formData.flight_number}
            onChange={(e) => handleChange("flight_number", e.target.value)}
            placeholder="напр. LH1234"
          />
          {errors.flight_number && <p className="text-sm text-red-500">{errors.flight_number}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Дата рейса</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.departure_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.departure_date ? format(formData.departure_date, "PPP") : <span>Выберите дату</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.departure_date}
                onSelect={(date) => handleChange("departure_date", date || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.departure_date && <p className="text-sm text-red-500">{errors.departure_date}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Сумма компенсации</Label>
          <Input
            id="amount"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="напр. 400"
          />
          {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="disruption_type">Тип сбоя</Label>
        <Select
          value={formData.disruption_type}
          onValueChange={(value) => handleChange("disruption_type", value)}
        >
          <SelectTrigger id="disruption_type">
            <SelectValue placeholder="Выберите тип сбоя" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="delay">Задержка</SelectItem>
            <SelectItem value="cancellation">Отмена</SelectItem>
            <SelectItem value="denied_boarding">Отказ в посадке</SelectItem>
            <SelectItem value="missed_connection">Пропущенная стыковка</SelectItem>
          </SelectContent>
        </Select>
        {errors.disruption_type && <p className="text-sm text-red-500">{errors.disruption_type}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Примечания</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Дополнительная информация"
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
          Отмена
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Создание..." : "Создать заявку"}
        </Button>
      </div>
    </form>
  );
};

export default NewClaimForm;
