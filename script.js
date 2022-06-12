const $characters = document.getElementById('characters')
const $charactersHeading = document.getElementById('charactersHeading')


const $name = document.getElementById('name')
const $con = document.getElementById('con')
const $IT = document.getElementById('IT')
const $prof = document.getElementById('prof')
const $HP = document.getElementById('HP')
const $reducedInjuries = document.getElementById('reducedInjuries')

const $makeCharacter = document.getElementById('makeCharacter')

let log = []

let characters = [
    
]
displayCharacters()

function displayCharacters() {
    $characters.innerHTML = ''
    if (localStorage.getItem('data') !== null) {
        let data = JSON.parse(localStorage.getItem('data'))
        if (data != undefined && Array.isArray(data) && data[0] && data[0].name != undefined) {
            characters = data
            characters.forEach(char => {
                makeCharacter(char, characters.indexOf(char))
            });
        }
    }
}

function setChangeListener(div, listener) {
    div.addEventListener("blur", listener);
    div.addEventListener("keyup", listener);
    div.addEventListener("paste", listener);
    div.addEventListener("copy", listener);
    div.addEventListener("cut", listener);
    div.addEventListener("delete", listener);
    div.addEventListener("mouseup", listener);
}

setChangeListener($con, updateThreshold)
setChangeListener($prof, updateThreshold)

function updateThreshold() {
    $IT.textContent = Math.floor($con.value / 2 * $prof.value)
}

setChangeListener($characters, updateWounds)
function updateWounds(e) {
    if (e.target.classList.contains('wounds')) {
        $charDiv = e.target.closest('.characterDiv')
        id = $charDiv.dataset.id

        characters[id].wounds = parseInt(e.target.value)
        saveData()
    }
}

$makeCharacter.addEventListener('click', function () {
    makeCharacter()
    saveData()
})

function makeCharacter(char, index) {
    let newChar = {
        name: $name.textContent,
        con: $con.value,
        prof: $prof.value,
        threshold: $IT.textContent,
        HP: $HP.value,
        HPMax: $HP.value,
        reducedInjuries: $reducedInjuries.checked,
        injuries: [],
        wounds: 0
    }
    if (char) newChar = char
    else characters.push(newChar)

    if (!index) index = characters.length - 1
    
    let reducedInjuries = newChar.reducedInjuries ? 
        `<p>Reduced Injuries </p>
                <p class='highlight'>${newChar.reducedInjuries}</p>` : ''

    let $newchar = `
        <div class='characterDiv' id='char-${index}' data-id='${index}'>
            <div>
                <h3>${newChar.name}</h3>
                <button class='kill'>X</button>
                <hr>
            </div>
            <div>
                <div class="grid">
                    <!--<p>Constitution Score </p>
                    <p class='highlight'>${newChar.con}</p>

                    <p>Proficiency Bonus </p>
                    <p class='highlight'>${newChar.prof}</p>-->

                    <p>Injury Threshold </p>
                    <p class='highlight'>${newChar.threshold}</p>
                    
                    ${reducedInjuries}
                </div>
                <hr>
                <div class='grid'>
                    <p>Injuries</p>
                    <p class='totalInjuries highlight'>${newChar.injuries.length}</p>

                    <p>Wounds</p>
                    <input class='wounds input' type='number' value="${newChar.wounds}" min=0>
                </div>
                <hr>
                <div class="grid">
                    <p>Hit Points </p>
                    <div>
                        <input class='hitPoints input small' value='${newChar.HP}' type='number'>
                        <span> / </span>
                        <span class='highlight hitPointMax'>${newChar.HPMax}</span>
                    </div>

                    <p>Damage</p>
                    <input class='damage input small' type='number' min=0/>
                        
                    <p>Critical Hit </p>
                    <label class='checkbox nolabel'>
                        <input class="crit" type="checkbox" />
                        <span></span>
                    </label>

                    <!--<button class='rollManually'>Roll Injury</button>-->
                    <button class='rollInjury'>Roll Injury</button>
                </div>
                <hr>
            </div>
            <div class='injuries'>
                ${newChar.injuryText ? newChar.injuryText : ''}
            </div>
        </div>
    `

    $characters.innerHTML += $newchar
}



// Rolling injury
$characters.addEventListener('click', function (e) {
    let $charDiv = e.target.closest('.characterDiv')
    let id = $charDiv.dataset.id
    if ($charDiv) {
        if (e.target.classList.contains('rollInjury')) rollInjury(id, false)
        if (e.target.classList.contains('rollCrit')) rollInjury(id, true)
        
        if (e.target.classList.contains('kill') && confirm('Really delete this character?')) {
            characters.splice(id, 1)
            saveData()
            displayCharacters()
        }

        if (e.target.classList.contains('recover')) {
            let $injuryDiv = e.target.closest('.injury')
            let result = $injuryDiv.dataset.id
            let injuryId = characters[id].injuries.findIndex(i => i == result)

            characters[id].injuries.splice(injuryId, 1)

            let $injuriesDiv = e.target.closest('.injuries')

            $injuryDiv.remove()
            $charDiv.querySelector('.totalInjuries').textContent = calculateInjuries(characters[id])
            characters[id].injuryText = $injuriesDiv.innerHTML
            saveData()
        }
    } else {
        console.log('couldnt find charDiv')
    }
})


function rollInjury(id, crit) {
    let char = characters[id]
    

    let $charDiv = document.getElementById('char-' + id)
    let $damage = $charDiv.querySelector('.damage')
    let $hitPoints = $charDiv.querySelector('.hitPoints')
    let $wounds = $charDiv.querySelector('.wounds')
    let $injuries = $charDiv.querySelector('.injuries')
    let $totalInjuries = $charDiv.querySelector('.totalInjuries')
    let $crit = $charDiv.querySelector('.crit')

    // Get damage taken
    let damage = $damage.value
    if (damage == 0) {
        console.log('No damage taken!')
        $damage.focus()
        return
    }

    let size = 6

    if (char.reducedInjuries) size -= 2

    // Critical hit
    if ($crit.checked) size += 4 

    // Injury at zero damage
    char.HP = $hitPoints.value
    if (char.HP == 0) size += 2

    // Apply damage
    $hitPoints.value -= damage
    char.HP = $hitPoints.value
    
        
    
    // Massive Damage 
    if ($hitPoints.value <= -char.threshold
        && $hitPoints.value <= -char.HPMax) {
            
        $injuries.innerHTML = `
            <div class='injury RE'>
                <button class='recover'>X</button>
                <h4>Death from Massive Damage!</h4>                
            </div>
        ` + $injuries.innerHTML
        
        saveData()
        return
    }

    // Below Zero
    if ($hitPoints.value < 0) {
        $hitPoints.value = 0

        // get remaining damage
        damage = -char.HP
        char.HP = 0

        // determine if it's a brutal injury
        let brutal = Math.floor(damage / char.threshold)
        char.wounds += brutal
        $wounds.value = char.wounds

        // determine number of dice to roll
        let dice = char.wounds + calculateInjuries(char) + 1
        let result = rollDice(dice + 'd' + size)

        let injury = getInjury(result, char.injuries, size)
        char.injuries.push(injury.result)

        let recovery = ''
        switch (injury.recovery) {
            case 'immediate':
                recovery = 'NA'
                break;
            case 'end of your next turn':
                recovery = 'NT'
                break;
            case 'short rest':
            case 'short rest / attacker dies':
                recovery = 'SR'
                break;
            case 'long rest':
                recovery = 'LR'
                break;
            case 'extended rest':
                recovery = 'ER'
                break;
            case 'revivify':
            case 'resurrection':
            case 'perhaps you could bribe your dungeon master?':
                recovery = 'RE'
                break;
            default: 
                ''
        }

        let extras = ['Roll: ' + dice + "d" + size, 'Excess damage: ' + damage]
        if (crit) extras.push(crit ? 'Critical Hit' : '')
        if (brutal) extras.push(brutal ? 'Wound x' + brutal : '')
        if (log.length > 0) {
            extras.push(log.join(', '))
            log = []
        }

        extras = extras.join(', ')

        let $newInjury = document.createElement('div')
        $newInjury.classList.add('injury', recovery)
        $newInjury.dataset.id = injury.result
        $newInjury.innerHTML = `
            <button class='recover'>X</button>
            <h4>${injury.result + ': ' + injury.name}!</h4>
            <p><span class='bold'>Effect: </span>${injury.effect}</p>
            <p><span class='bold'>Recovery:</span> ${injury.recovery}</p>
            <p class='subtle'> ${extras ? extras : ''}</p>
        `
        $injuries.prepend($newInjury)

        $totalInjuries.textContent = calculateInjuries(char)

        char.injuryText = $injuries.innerHTML
        saveData()
    } else {
        console.log('No injury')
        saveData()
    }    
}

function calculateInjuries(char) {
    let injuries = 0
    char.injuries.forEach(injury => {
        if (!injuryTable[injury] || injuryTable[injury].recovery != 'immediate') injuries++
    })

    return injuries
}

function saveData() {
    localStorage.setItem('data', JSON.stringify(characters))
}
