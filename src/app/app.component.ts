import { Component, ElementRef, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { InnerComponent } from './components/inner/inner.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eventIframe';
  @ViewChild('iframe', { static: false }) iframe: ElementRef;

  firstInput = 5;
  doc;
  compRef: ComponentRef<InnerComponent>;

  constructor(private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver) { }

  onLoad(iframe) {
    this.doc = iframe.contentDocument || iframe.contentWindow;
    this.createComponent();
  }

  createComponent() {
    const compFactory = this.resolver.resolveComponentFactory(InnerComponent);
    this.compRef = this.vcRef.createComponent(compFactory);
    this.compRef.location.nativeElement.id = 'innerComp';

    (<InnerComponent>this.compRef.instance).firstInput = this.firstInput;

    (<InnerComponent>this.compRef.instance).emitOutput.subscribe(name => {
      alert("Hello " + name + " , (called from child window)");
    });

    this.doc.body.appendChild(this.compRef.location.nativeElement);
  }
}
