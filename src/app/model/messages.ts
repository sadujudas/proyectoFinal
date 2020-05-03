import { environment } from '../../environments/environment';

export class MessagesTitles{
    "Error" = "Error"
    "Error_Grave"  = "Error Grave";
    "Error_Leve" = "Error Leve";
    "Error_Algo_Salio_Mal" = "¡Algo salió mal!";
    "Error_BackEnd" = "Error de Servidor";
    "Error_Invalido" = "¡El documento es inválido!";
    "Error_Fuera_Rango" = "¡El valor esta fuera de rango!";
    "Error_Valor_Negativo" = "¡No se admite valor en negativo!";

}

export class MessagesGeneral{

    "Error_Campos_Vacios"  = "No puedes dejar campos vacíos";
    "Error_Ajuste_Alto" = "Hay un Ajuste mayor a 2 unidades monetarias";


}


export class MessagesProformaAgregarDetalle{

    "Error_VNPP_Invalido"  = "¡El VNNP no puede ser menor a 30!";
    "Error_TEM" = "¡El TEM no puede ser menor a 1.80 y mayor a 3.00!";
    "Error_Desemboldo" = "¡El valor desembolso es negativo!";

}

export class MessagesStatus{
    
    message:string ='';

    getMessage(status:number){
        switch (status) {
            case 401:      //Inautorizado
                this.message = "Inautorizado.";
                break;
            case 405:      //Metodo no permitido
                this.message = "Metodo no permitido. Contacte con soporte.";
                break;
            case 404:      //Error de ruta
                this.message = "Ruta no encontrada. Contacte con soporte.";
                break;
            case 500:     //error de servidor
                this.message = "Vuelva a intentar la operación. Si el problema persiste contacte con soporte.";
                break;
        }
    }

}


/*
export class MessagesPagos{

    "Error_Grave"  = "Error Grave";
    "Error_Leve"  = "Error Leve";
    "Error_Fecha_Emision"  = "Error Grave";
    "Error_Fecha"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave"; 
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave"; 
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";
    "Error Grave"  = "Error Grave";

}*/

export class MessagesDates{
  
    "Error_Fecha_Emision_menor_6_Meses"  = "La Fecha de Emision no puede ser menor a 6 meses";
    "Error_Pago_menor_Vencimiento"  = "La Fecha de Pago no puede ser menor a la de Fecha de Vencimiento";
    "Error_Emision_mayor_Vencimiento"  = "La fecha de Emision no puede ser mayor a la de vencimiento";
    "Error_Pago_menor_Actual"  = "La fecha de Pago no puede ser menor a la de hoy";
    "Error_Vencimiento_menor_Actual"  = "La fecha de Vencimiento no puede ser menor a la Fecha de hoy";
    "Error_Entrega_menor_Emision"  = "La Fecha de Entrega no puede ser menor a la Fecha de Emisión"; 
    "Error_Entrega_mayor_Actual"  = "La Fecha de Entrega no puede ser mayor a la Fecha de hoy";
    "Error_Emision_mayor_Actual"  = "La Fecha de Emisión no puede ser mayor a la Fecha de hoy";
   


}