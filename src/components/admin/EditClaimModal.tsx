
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Claim } from "@/hooks/use-claims";
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
import { format, parse } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type EditClaimModalProps = {
  claim: Claim | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Claim>) => void;
  isSubmitting?: boolean;
};

const EditClaimModal = ({ claim, isOpen, onClose, onUpdate, isSubmitting = false }: EditClaimModalProps) => {
  const [formData, setFormData] = useState<Partial<Claim> & { id: string }>({
    id: "",
    customer: "",
    email: "",
    airline: "",
    flight_number: "",
    departure_date: "",
    status: "pending",
    stage: "initial_review",
    amount: "",
    disruption_type: "",
    departure_airport: "",
    arrival_airport: "",
    notes: "",
  });

  useEffect(() => {
    if (claim) {
      setFormData({
        ...claim,
      });
    }
  }, [claim]);

  if (!claim) return null;

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id) {
      toast.error("ID заявки отсутствует");
      return;
    }

    // Отправляем обновленные данные
    onUpdate(formData.id, {
      ...formData,
    });
  };

  // Конвертируем строку даты в объект Date для календаря
  const getDateObject = (dateString: string) => {
    try {
      return parse(dateString, "yyyy-MM-dd", new Date());
    } catch (error) {
      return new Date();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Редактировать заявку</DialogTitle>
          <DialogDescription>
            ID: {claim.id}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Имя клиента</Label>
            <Input
              id="customer"
              value={formData.customer}
              onChange={(e) => handleChange("customer", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departure_airport">Аэропорт вылета</Label>
              <Input
                id="departure_airport"
                value={formData.departure_airport}
                onChange={(e) => handleChange("departure_airport", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="arrival_airport">Аэропорт прибытия</Label>
              <Input
                id="arrival_airport"
                value={formData.arrival_airport}
                onChange={(e) => handleChange("arrival_airport", e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="airline">Авиакомпания</Label>
              <Input
                id="airline"
                value={formData.airline}
                onChange={(e) => handleChange("airline", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flight_number">Номер рейса</Label>
              <Input
                id="flight_number"
                value={formData.flight_number}
                onChange={(e) => handleChange("flight_number", e.target.value)}
              />
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
                      "w-full justify-start text-left font-normal"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.departure_date ? format(getDateObject(formData.departure_date), "dd.MM.yyyy") : <span>Выберите дату</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={getDateObject(formData.departure_date)}
                    onSelect={(date) => handleChange("departure_date", date ? format(date, "yyyy-MM-dd") : "")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Сумма компенсации</Label>
              <Input
                id="amount"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="in_progress">В обработке</SelectItem>
                  <SelectItem value="approved">Подтверждено</SelectItem>
                  <SelectItem value="rejected">Отклонено</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stage">Этап</Label>
              <Select
                value={formData.stage}
                onValueChange={(value) => handleChange("stage", value)}
              >
                <SelectTrigger id="stage">
                  <SelectValue placeholder="Выберите этап" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial_review">Начальная проверка</SelectItem>
                  <SelectItem value="documentation">Документация</SelectItem>
                  <SelectItem value="airline_submission">Отправлено авиакомпании</SelectItem>
                  <SelectItem value="negotiation">Переговоры</SelectItem>
                  <SelectItem value="payment">Оплата</SelectItem>
                </SelectContent>
              </Select>
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Примечания</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClaimModal;
