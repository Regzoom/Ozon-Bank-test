const Progress = (function () {
    const ring = document.getElementById('progressRing');

    let _value = 60;
    let _animated = false;
    let _hidden = false;

    ring.style.setProperty('--progress', _value);

    function setValue(v) {
        v = Math.max(0, Math.min(100, Number(v) || 0));
        _value = v;
        ring.style.setProperty('--progress', v);
    }

    function setAnimated(on) {
        _animated = !!on;
        ring.classList.toggle('animated', _animated);
    }

    function setHidden(on) {
        _hidden = !!on;
        ring.classList.toggle('hidden', _hidden);
    }

    function getValue() { return _value; }
    function isAnimated() { return _animated; }
    function isHidden() { return _hidden; }

    return { setValue, setAnimated, setHidden, getValue, isAnimated, isHidden };
})();

const valueInput = document.getElementById('valueInput');
const animateToggle = document.getElementById('animateToggle');
const hideToggle = document.getElementById('hideToggle');

valueInput.value = Progress.getValue();

valueInput.addEventListener('input', function () {
    let v = parseInt(this.value, 10);
    if (isNaN(v)) return;
    if (v < 0) { v = 0; this.value = 0; }
    if (v > 100) { v = 100; this.value = 100; }
    Progress.setValue(v);
});

valueInput.addEventListener('blur', function () {
    if (this.value === '' || isNaN(parseInt(this.value, 10))) {
        this.value = Progress.getValue();
    }
});

animateToggle.addEventListener('change', function () {
    Progress.setAnimated(this.checked);
});

hideToggle.addEventListener('change', function () {
    Progress.setHidden(this.checked);
});