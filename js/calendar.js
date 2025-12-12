let allEvents = [
    {
        "title": "Réunion",
        "start": "2025-11-20",
        "extendedProps": {
            "summary": "Réunion commenditaire",
            "description": "Le groupe à une réunion commenditaire avec le 47 Fight Club",
            "owner": "Nathan VIDAL"
        }
    },
    {
        "title": "Évènement sur plusieurs jours",
        "start": "2025-11-24",
        "end": "2025-11-25T12:00:00",
        "owner": "Nathan VIDAL"
    },
    {
        "title": "Rendez-vous",
        "start": "2025-11-28T14:30:00",
        "owner": "Nathan VIDAL"
    }
];

let toFrench = {
    "Mon": "Lun", "Tue": "Mar", "Wed": "Mer", "Thu": "Jeu", "Fri": "Ven", "Sat": "Sam", "Sun": "Dim",
    "Jan": "Jan", "Feb": "Fév", "Mar": "Mar", "Apr": "Avr", "May": "Mai", "Jun": "Juin", "Jul": "Juil", "Aug": "Aoû", "Sep": "Sep", "Oct": "Oct", "Nov": "Nov", "Dec": "Déc", 
};

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        aspectRatio: 1.75,
        locale: "fr",
        multiMonthMaxColumns: 4,
        initialView: 'dayGridMonth',
        firstDay: 1,
        events: allEvents,
        navLinks: true,
        navLinkDayClick: 'dayGridDay',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,dayGridWeek'
        },
        buttonText: {
            dayGridWeek: 'Semaine',
            dayGridMonth: 'Mois',
            multiMonthYear: 'Année',
        },
        eventClick: function (mouseClickInfo) {
            document.getElementById('evtTitle').textContent = mouseClickInfo.event.title;
            if (mouseClickInfo.event.end === null) {
                let dateList = mouseClickInfo.event.start.toString().split(' ');
                let text = toFrench[dateList[0]] + " " + dateList[2] + " " + toFrench[dateList[1]] + " " + dateList[3];
                document.getElementById('evtDate').textContent = text;
                if (dateList[4] == "00:00:00") {
                    document.getElementById('evtHour').textContent = "Toute la journée";
                } else {
                    document.getElementById('evtHour').textContent = dateList[4];
                }
            } else {
                let startList = mouseClickInfo.event.start.toString().split(' ');
                let endList = mouseClickInfo.event.end.toString().split(' ');
                let startText = toFrench[startList[0]] + " " + startList[2] + " " + toFrench[startList[1]] + " " + startList[3];
                let endText = toFrench[endList[0]] + " " + endList[2] + " " + toFrench[endList[1]] + " " + endList[3];
                document.getElementById('evtDate').textContent = startText + " - " + endText;
                document.getElementById('evtHour').textContent = startList[4] + " - " + endList[4];
            }
            document.getElementById('evtSummary').textContent = mouseClickInfo.event.extendedProps.summary;
            document.getElementById('evtDescription').textContent = mouseClickInfo.event.extendedProps.description;
            document.getElementById('evtMaker').textContent = mouseClickInfo.event.extendedProps.owner;
        },
        eventMouseEnter: function (mouseEnterInfo) {
            mouseEnterInfo.el.style.borderBottom = "3px red solid";
            mouseEnterInfo.el.style.borderRight = "3px red solid";
            mouseEnterInfo.el.style.transition = "200ms";
            mouseEnterInfo.el.style.cursor = "pointer";
        },
        eventMouseLeave: function (mouseLeaveInfo) {
            mouseLeaveInfo.el.style.border = '';
        }
    });
    calendar.render();
});