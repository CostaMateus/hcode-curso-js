class CalculatorController
{

    constructor() {
        // super();
        this._locale        = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl        = document.querySelector('#date');
        this._timeEl        = document.querySelector('#time');

        this._operation     = [];

        this._lastOperator;
        this._lastNumber;

        this._currentDateTime;
        this.initialize();
        this.initButtonsEvents();
        this.setLastNumberToDisplay();
    }

    initialize()
    {
        this.setDisplayDateTime();

        setInterval( () => {
            this.setDisplayDateTime();
        }, 1000);
    }

    initButtonsEvents()
    {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach( (btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let txtBtn = btn.className.baseVal.replace('btn-', '');
                this.execBtn(txtBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            });
        });
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

    setDisplayDateTime()
    {
        this.displayDate = this.currentDateTime.toLocaleDateString(this._locale, {
            day:   '2-digit',
            month: 'short',
            year:  'numeric'
        });

        this.displayTime = this.currentDateTime.toLocaleTimeString(this._locale);
    }

    addEventListenerAll(element, events, fn)
    {
        events.split(' ').forEach( ev => {
            element.addEventListener(ev, fn, false);
        });
    }

    execBtn(val)
    {
        switch (val)
        {
            case 'ac': // all clear
                this.clearAll();
                break;

            case 'ce': // cancel entry
                this.cancelEntry();
                break;

            case 'addition':
                this.addOperation('+');
                break;

            case 'subtraction':
                this.addOperation('-');
                break;

            case 'division':
                this.addOperation('/');
                break;

            case 'multiplication':
                this.addOperation('*');
                break;

            case 'dot':
                this.addOperation('.');
                break;

            case 'percent':
                this.addOperation('%');
                break;

            case 'equal':
                this.calc();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(val));
                break;

            default:
                this.setError();
                break;
        }
    }

    clearAll()
    {
        this._operation = [];
        this._lastOperator;
        this._lastNumber = 0;
        this.setLastNumberToDisplay();
    }

    cancelEntry()
    {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError()
    {
        this.displayCalc = 'Error';
    }

    addOperation(val)
    {
        // isNaN == is Not a Number
        if ( isNaN(this.getLastOperation()) )
        {
            if (this.isOperator(val))
            {
                if (typeof this.getLastOperation() !== 'undefined')
                {
                    this.setLastOperation(val);
                }
            }
            else if ( isNaN(val) )
            {
                // console.log('outra coisa');
            }
            else
            {
                this.pushOperation(val);
            }
        }
        else
        {
            if ( this.isOperator(val) )
            {
                this.pushOperation(val);
            }
            else
            {
                let newVal = this.getLastOperation().toString() + val.toString();
                this.setLastOperation(parseInt(newVal));
            }
        }

        this.setLastNumberToDisplay();
    }

    getLastOperation()
    {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(val)
    {
        this._operation[this._operation.length - 1] = val;
    }

    isOperator(val)
    {
        return ( ['+','-','*','/','%'].indexOf(val) > -1 );
    }

    pushOperation(val)
    {
        this._operation.push(val);

        if ( this._operation.length > 3 )
        {
            this.calc();
        }
    }

    calc()
    {
        let last = '';

        this._lastOperator = this.getLastItem();

        if (typeof this._lastOperator !== 'undefined')
        {
            if ( this._operation.length < 3 )
            {
                let firstItem    = this._operation[0];
                this._lastNumber = ( this._lastNumber ) ? this._lastNumber : firstItem;
                this._operation  = [firstItem, this._lastOperator, this._lastNumber];
            }

            if ( this._operation.length > 3 )
            {
                last             = this._operation.pop();
                this._lastNumber = this.getResult();
            }
            else if ( this._operation.length == 3 )
            {
                this._lastNumber = this.getLastItem(false);
            }
        }

        let result = this.getResult();

        if (last == '%')
        {
            result /= 100;
            this._operation  = [result];
        }
        else
        {
            this._operation  = [result];

            if ( last ) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay()
    {
        let lastnumber = this.getLastItem(false) ;

        if ( !lastnumber ) lastnumber = 0;

        this.displayCalc = lastnumber;
    }

    getResult()
    {
        // console.log("getResult: ", this._operation);

        return eval( this._operation.join("") );
    }

    getLastItem(isOperator = true)
    {
        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--)
        {
            if ( this.isOperator( this._operation[i] ) == isOperator )
            {
                lastItem = this._operation[i];
                break;
            }
        }

        if ( !lastItem )
        {
            lastItem = ( isOperator ) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }
}
