class Progress {
    constructor(container) {
        this._value = 0;
        this._animated = false;
        this._hidden = false;

        var card = document.createElement('div');
        card.className = 'card';

        var label = document.createElement('span');
        label.className = 'card-label';
        label.textContent = 'Progress';
        card.appendChild(label);

        var progressArea = document.createElement('div');
        progressArea.className = 'progress-area';
        var ring = document.createElement('div');
        ring.className = 'progress-ring';
        progressArea.appendChild(ring);
        card.appendChild(progressArea);
        this._ring = ring;

        var controlsArea = document.createElement('div');
        controlsArea.className = 'controls-area';

        var valueInput = this._createValueRow(controlsArea);
        this._createToggleRow(controlsArea, 'Animate', function (checked) {
            this.setAnimated(checked);
        }.bind(this));
        this._createToggleRow(controlsArea, 'Hide', function (checked) {
            this.setHidden(checked);
        }.bind(this));

        card.appendChild(controlsArea);
        container.appendChild(card);

        this._valueInput = valueInput;
        this.setValue(0);
    }

    _createValueRow(parent) {
        var row = document.createElement('div');
        row.className = 'control-row';

        var input = document.createElement('input');
        input.className = 'value-input';
        input.type = 'number';
        input.min = '0';
        input.max = '100';

        var self = this;
        input.addEventListener('input', function () {
            var v = parseInt(this.value, 10);
            if (isNaN(v)) return;
            if (v < 0) { v = 0; this.value = 0; }
            if (v > 100) { v = 100; this.value = 100; }
            self.setValue(v);
        });
        input.addEventListener('blur', function () {
            if (this.value === '' || isNaN(parseInt(this.value, 10))) {
                this.value = self.getValue();
            }
        });

        var label = document.createElement('span');
        label.className = 'control-label';
        label.textContent = 'Value';

        row.appendChild(input);
        row.appendChild(label);
        parent.appendChild(row);
        return input;
    }

    _createToggleRow(parent, text, onChange) {
        var row = document.createElement('div');
        row.className = 'control-row';

        var toggle = document.createElement('label');
        toggle.className = 'toggle';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function () {
            onChange(this.checked);
        });

        var track = document.createElement('span');
        track.className = 'toggle-track';
        var thumb = document.createElement('span');
        thumb.className = 'toggle-thumb';

        toggle.appendChild(checkbox);
        toggle.appendChild(track);
        toggle.appendChild(thumb);

        var label = document.createElement('span');
        label.className = 'control-label';
        label.textContent = text;

        row.appendChild(toggle);
        row.appendChild(label);
        parent.appendChild(row);
    }

    setValue(v) {
        v = Math.max(0, Math.min(100, Number(v) || 0));
        this._value = v;
        this._ring.style.setProperty('--progress', v);
        this._valueInput.value = v;
    }

    setAnimated(on) {
        this._animated = !!on;
        this._ring.classList.toggle('animated', this._animated);
    }

    setHidden(on) {
        this._hidden = !!on;
        this._ring.classList.toggle('hidden', this._hidden);
    }

    getValue() { return this._value; }
    isAnimated() { return this._animated; }
    isHidden() { return this._hidden; }
}

new Progress(document.getElementById('progress'));