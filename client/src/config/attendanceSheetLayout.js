export const ATTENDANCE_PAGE = {
  width: 210,
  height: 297
};

export const ATTENDANCE_LAYOUT = {
  tableX: 12,
  tableWidth: 186,

  schoolY: 16,
  departmentY: 22.5,
  headingY: 28.5,
  documentTitleY: 34.5,
  classY: 40.5,

  dateRowY: 44.5,
  dateRowHeight: 8,

  columnHeaderY: 52.5,
  columnHeaderHeight: 8,

  studentRowsY: 60.5,
  rowHeight: 5.35,

  rowsPerPage: 39,

  coordinatorGap: 8,

  columns: {
    serial: 15,
    enrollment: 43,
    name: 110,
    sign: 18
  }
};

export const ATTENDANCE_TYPOGRAPHY = {
  fontFamily: "times",
  svgFontFamily: "'Times New Roman', Times, serif",

  school: {
    size: 15,
    weight: "bold"
  },

  department: {
    size: 12,
    weight: "bold"
  },

  heading: {
    size: 11.5,
    weight: "bold"
  },

  documentTitle: {
    size: 13,
    weight: "bold"
  },

  className: {
    size: 11.5,
    weight: "bold"
  },

  date: {
    size: 9.5,
    weight: "normal"
  },

  dateLabel: {
    size: 9.5,
    weight: "bold"
  },

  columnHeader: {
    size: 9.5,
    weight: "bold"
  },

  serial: {
    size: 8.8,
    minimumSize: 7.2
  },

  enrollment: {
    size: 8.6,
    minimumSize: 7.2
  },

  studentName: {
    size: 9.0,
    minimumSize: 7.4
  },

  coordinator: {
    size: 10.5,
    weight: "bold"
  }
};
