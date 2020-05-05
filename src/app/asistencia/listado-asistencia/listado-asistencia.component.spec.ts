import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAsitenciaComponent } from './listado-asistencia.component';

describe('ListadoAsitenciaComponent', () => {
    let component: ListadoAsitenciaComponent;
    let fixture: ComponentFixture<ListadoAsitenciaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations:[ListadoAsitenciaComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoAsitenciaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('shouls create', () => {
        expect(component).toBeTruthy();
    });
});