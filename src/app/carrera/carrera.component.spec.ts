import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraComponent } from './carrera.component';

describe('CarreraComponent', () =>{
    let component: CarreraComponent;
    let fixture: ComponentFixture<CarreraComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CarreraComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarreraComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});