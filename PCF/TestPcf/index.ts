namespace SCPDynamics365 {
  interface IInputs {
    value: ComponentFramework.PropertyTypes.StringProperty;
    placeholder: ComponentFramework.PropertyTypes.StringProperty;
  }

  interface IOutputs {
    value?: string;
  }

  export class TestPcf implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container!: HTMLDivElement;
    private inputElement!: HTMLInputElement;
    private notifyOutputChanged!: () => void;
    private currentValue = "";

    public init(
      context: ComponentFramework.Context<IInputs>,
      notifyOutputChanged: () => void,
      _state: ComponentFramework.Dictionary,
      container: HTMLDivElement
    ): void {
      this.notifyOutputChanged = notifyOutputChanged;
      this.container = container;

      this.inputElement = document.createElement("input");
      this.inputElement.type = "text";
      this.inputElement.className = "scp-test-pcf-input";
      this.inputElement.style.width = "100%";
      this.inputElement.style.boxSizing = "border-box";
      this.inputElement.style.padding = "8px 10px";
      this.inputElement.style.border = "1px solid #b3b3b3";
      this.inputElement.style.borderRadius = "4px";

      this.inputElement.addEventListener("input", () => {
        this.currentValue = this.inputElement.value;
        this.notifyOutputChanged();
      });

      this.container.appendChild(this.inputElement);
      this.updateView(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
      const boundValue = context.parameters.value.raw ?? "";
      const placeholder = context.parameters.placeholder.raw ?? "Texto de prueba";

      this.currentValue = boundValue;
      this.inputElement.value = boundValue;
      this.inputElement.placeholder = placeholder;
      this.inputElement.disabled = context.mode.isControlDisabled;
    }

    public getOutputs(): IOutputs {
      return {
        value: this.currentValue,
      };
    }

    public destroy(): void {
      this.inputElement?.remove();
    }
  }
}