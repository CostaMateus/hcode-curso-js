class CalculatorController {

    constructor() {
        // super();
        this._locale        = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl        = document.querySelector("#date");
        this._timeEl        = document.querySelector("#time");

        this._currentDateTime;
        this.initialize();
    }

    initialize()
    {
        setInterval( () => {
            this.displayDate = this.currentDateTime.toLocaleDateString(this._locale, {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });
            this.displayTime = this.currentDateTime.toLocaleTimeString(this._locale);

        }, 1000);
    }

    /**
     * get calc
     */
    get displayCalc()
    {
        return this._displayCalcEl.innerHTML;
    }

    /**
     * Set calc
     */
    set displayCalc(val)
    {
        this._displayCalcEl.innerHTML = val;
    }

    /**
     * Get time
     */
    get displayTime()
    {
        return this._timeEl.innerHTML;
    }

    /**
     * Set time
     */
    set displayTime(val)
    {
        this._timeEl.innerHTML = val;
    }

    /**
     * Get date
     */
    get displayDate()
    {
        return this._dateEl.innerHTML;
    }

    /**
     * Set date
     */
    set displayDate(val)
    {
        this._dateEl.innerHTML = val;
    }

    /**
     * Get current date
     */
    get currentDateTime()
    {
        return new Date();
    }

    /**
     * Set current date
     */
    set currentDateTime(val)
    {
        this._currentDateTime = val;
    }

}
