import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoHorarioComponent } from './listado-horario.component';

describe('ListadoHorarioComponent', () => {
    let component: ListadoHorarioComponent;
    let fixture: ComponentFixture<ListadoHorarioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations:[ListadoHorarioComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoHorarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('shouls create', () => {
        expect(component).toBeTruthy();
    });
});