
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MoreHorizontal, Trash2, Edit, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Claim } from "@/hooks/use-claims";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

type ClaimsTableProps = {
  claims: Claim[] | undefined;
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (claim: Claim) => void;
  onView: (claim: Claim) => void;
};

const ClaimsTable = ({ claims, isLoading, onDelete, onEdit, onView }: ClaimsTableProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Авиакомпания</TableHead>
              <TableHead>Рейс</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Этап</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Обновлено</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims?.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                  Нет заявок. Создайте новую заявку с помощью кнопки "+ New Claim".
                </TableCell>
              </TableRow>
            )}
            {claims?.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">{claim.id.substring(0, 8)}...</TableCell>
                <TableCell>{claim.customer}</TableCell>
                <TableCell>{claim.airline}</TableCell>
                <TableCell>{claim.flight_number}</TableCell>
                <TableCell>
                  {format(new Date(claim.departure_date), "dd.MM.yyyy")}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(claim.status)}>
                    {getStatusLabel(claim.status)}
                  </Badge>
                </TableCell>
                <TableCell>{getStageLabel(claim.stage)}</TableCell>
                <TableCell>{claim.amount}</TableCell>
                <TableCell>
                  {format(new Date(claim.last_updated), "dd.MM.yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Открыть меню</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Действия</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onView(claim)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Просмотр
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(claim)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeleteId(claim.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Заявка будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ClaimsTable;
