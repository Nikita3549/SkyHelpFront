
import React from "react";
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
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type ViewClaimModalProps = {
  claim: Claim | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (claim: Claim) => void;
};

const ViewClaimModal = ({ claim, isOpen, onClose, onEdit }: ViewClaimModalProps) => {
  if (!claim) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case "initial_review":
        return "Начальная проверка";
      case "documentation":
        return "Документация";
      case "airline_submission":
        return "Отправлено авиакомпании";
      case "negotiation":
        return "Переговоры";
      case "payment":
        return "Оплата";
      default:
        return stage;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает";
      case "in_progress":
        return "В обработке";
      case "approved":
        return "Подтверждено";
      case "rejected":
        return "Отклонено";
      default:
        return status;
    }
  };

  const getDisruptionTypeLabel = (type: string) => {
    switch (type) {
      case "delay":
        return "Задержка";
      case "cancellation":
        return "Отмена";
      case "denied_boarding":
        return "Отказ в посадке";
      case "missed_connection":
        return "Пропущенная стыковка";
      default:
        return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Детали заявки</DialogTitle>
          <DialogDescription>
            ID: {claim.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex justify-between">
            <Badge variant="outline" className={getStatusColor(claim.status)}>
              {getStatusLabel(claim.status)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Обновлено: {format(new Date(claim.last_updated), "dd.MM.yyyy")}
            </span>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Клиент</h4>
              <p>{claim.customer}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
              <p>{claim.email}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Авиакомпания</h4>
              <p>{claim.airline}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Рейс</h4>
              <p>{claim.flight_number}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Аэропорт вылета</h4>
              <p>{claim.departure_airport}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Аэропорт прибытия</h4>
              <p>{claim.arrival_airport}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Дата рейса</h4>
              <p>{format(new Date(claim.departure_date), "dd.MM.yyyy")}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Тип сбоя</h4>
              <p>{getDisruptionTypeLabel(claim.disruption_type)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Сумма</h4>
              <p className="font-medium">{claim.amount}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Этап</h4>
              <p>{getStageLabel(claim.stage)}</p>
            </div>
          </div>

          {claim.notes && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Примечания</h4>
                <p className="text-sm">{claim.notes}</p>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button onClick={() => onEdit(claim)}>
            Редактировать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewClaimModal;
