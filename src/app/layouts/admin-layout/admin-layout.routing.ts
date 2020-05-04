import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { UsuarioComponent } from '../../usuario/usuario.component';
import { ListadoUsuarioComponent } from '../../usuario/listado-usuario/listado-usuario.component';
import { RegistroUsuarioComponent } from '../../usuario/listado-usuario/registro-usuario/registro-usuario.component';
import { AlumnoComponent } from '../../alumno/alumno.component';
import { ListadoAlumnoComponent } from '../../alumno/listado-alumno/listado-alumno.component';
import { RegistroAlumnoComponent } from '../../alumno/listado-alumno/registro-alumno/registro-alumno.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: 'usuario', component: UsuarioComponent,
    children: [
      {path:'listado',component: ListadoUsuarioComponent}
    ]
  },
  { path: "alumno", component: AlumnoComponent, 
  children: [
    {path:'listado',component: ListadoAlumnoComponent}
  ]
},
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
