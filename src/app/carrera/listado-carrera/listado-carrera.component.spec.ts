import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCarreraComponent } from './listado-carrera.component';

describe('ListadoCarreraComponent', () => {
    let component: ListadoCarreraComponent;
    let fixture: ComponentFixture<ListadoCarreraComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations:[ListadoCarreraComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoCarreraComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('shouls create', () => {
        expect(component).toBeTruthy();
    });
});