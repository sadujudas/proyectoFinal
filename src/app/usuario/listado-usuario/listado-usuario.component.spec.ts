import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsuarioComponent } from './listado-usuario.component';

describe('ListadoUsuarioComponent', () => {
    let component: ListadoUsuarioComponent;
    let fixture: ComponentFixture<ListadoUsuarioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations:[ListadoUsuarioComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('shouls create', () => {
        expect(component).toBeTruthy();
    });
});