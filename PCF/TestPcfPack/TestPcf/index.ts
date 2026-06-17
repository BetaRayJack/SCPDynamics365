import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class TestPcf implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container!: HTMLDivElement;
    private titleElement!: HTMLDivElement;
    private sliderElement!: HTMLInputElement;
    private labelsElement!: HTMLDivElement;
    private valueElement!: HTMLDivElement;
    private notifyOutputChanged!: () => void;
    private currentIndex = 0;

    private readonly levels = ["Safe", "Euclid", "Keter", "Taumiel", "Apoyllon"];
    private readonly levelColors = ["#2e7d32", "#f9a825", "#c62828", "#1565c0", "#c62828"];

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.container = container;

        this.container.style.display = "flex";
        this.container.style.flexDirection = "column";
        this.container.style.gap = "10px";
        this.container.style.padding = "6px 2px";

        this.titleElement = document.createElement("div");
        this.titleElement.textContent = "SCP Volume Control v1.0.2";
        this.titleElement.style.fontFamily = "Segoe UI, sans-serif";
        this.titleElement.style.fontSize = "12px";
        this.titleElement.style.fontWeight = "700";
        this.titleElement.style.letterSpacing = "0.3px";
        this.titleElement.style.textTransform = "uppercase";
        this.titleElement.style.color = "#666";

        this.valueElement = document.createElement("div");
        this.valueElement.style.fontFamily = "Segoe UI, sans-serif";
        this.valueElement.style.fontSize = "14px";
        this.valueElement.style.fontWeight = "600";
        this.valueElement.style.color = "#1f1f1f";

        this.sliderElement = document.createElement("input");
        this.sliderElement.type = "range";
        this.sliderElement.min = "0";
        this.sliderElement.max = String(this.levels.length - 1);
        this.sliderElement.step = "1";
        this.sliderElement.style.width = "100%";
        this.sliderElement.style.margin = "0";
        this.sliderElement.style.accentColor = this.levelColors[0];

        this.labelsElement = document.createElement("div");
        this.labelsElement.style.display = "grid";
        this.labelsElement.style.gridTemplateColumns = `repeat(${this.levels.length}, 1fr)`;
        this.labelsElement.style.gap = "6px";
        this.labelsElement.style.fontFamily = "Segoe UI, sans-serif";
        this.labelsElement.style.fontSize = "11px";
        this.labelsElement.style.color = "#4d4d4d";

        this.levels.forEach((level) => {
            const label = document.createElement("div");
            label.textContent = level;
            label.style.textAlign = "center";
            label.style.userSelect = "none";
            this.labelsElement.appendChild(label);
        });

        this.sliderElement.addEventListener("input", () => {
            this.currentIndex = Number(this.sliderElement.value);
            this.updateDisplay();
            this.notifyOutputChanged();
        });

        container.appendChild(this.titleElement);
        container.appendChild(this.valueElement);
        container.appendChild(this.sliderElement);
        container.appendChild(this.labelsElement);
        this.updateView(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const boundValue = context.parameters.value.raw ?? "Safe";
        const normalizedIndex = this.getLevelIndex(boundValue);

        this.currentIndex = normalizedIndex;
        this.sliderElement.value = String(normalizedIndex);
        this.sliderElement.disabled = context.mode.isControlDisabled;
        this.updateDisplay();
    }

    public getOutputs(): IOutputs {
        return {
            value: this.levels[this.currentIndex]
        };
    }

    public destroy(): void {
        this.titleElement?.remove();
        this.sliderElement?.remove();
        this.labelsElement?.remove();
        this.valueElement?.remove();
    }

    private getLevelIndex(value: string): number {
        const normalized = value.trim().toLowerCase();
        const index = this.levels.findIndex((level) => level.toLowerCase() === normalized);

        return index >= 0 ? index : 0;
    }

    private updateDisplay(): void {
        const level = this.levels[this.currentIndex];
        const color = this.levelColors[this.currentIndex];
        const progress = (this.currentIndex / (this.levels.length - 1)) * 100;

        this.valueElement.textContent = `Nivel actual: ${level}`;
        this.valueElement.style.color = color;
        this.sliderElement.style.accentColor = color;
        this.sliderElement.style.background = `linear-gradient(90deg, ${color} 0%, ${color} ${progress}%, #d9d9d9 ${progress}%, #d9d9d9 100%)`;
    }
}
