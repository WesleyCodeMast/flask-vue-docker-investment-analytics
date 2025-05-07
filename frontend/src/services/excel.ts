import ExcelJS from 'exceljs';

import { CompanyController } from '@/controllers/company/types';
import { TableData, TableRow } from '@/components/ui/table/types';
import { preprocess } from '@/controllers/compiler/preprocessor';

import {
  ratio,
  dollars,
  money,
  percentage,
} from '@/services/renderers';

export const getColumnName = (name: string, column: string | number): string => `${name}${column.toString()
  .replace(' ', '').replace('(', '').replace(')', '')
  .replace(`${"'"}`, '')}`;

export const convertFormulas = (input: any, context: any, data: TableData, column: string) => {
  const expressions = preprocess(input, data, context);
  if (!(expressions instanceof Set) || expressions.size === 0) {
    return expressions;
  }

  let output = input;

  expressions.forEach((expression) => {
    output = output.replace(
      expression.input,
      getColumnName(expression.variable, expression.column[column]),
    );
  });
  // output = output.replace(',', ';').replace('**', '^');
  output = output.replace(/\*\*/g, '^');

  return output;
};

export const exportExcel = async (company: CompanyController, data: TableData) => { // eslint-disable-line
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'TopFunds (https://topfunds.com/)';
  workbook.lastModifiedBy = 'TopFunds (https://topfunds.com/)';
  workbook.created = new Date();
  workbook.modified = workbook.created;
  workbook.lastPrinted = workbook.created;

  const sheet = workbook.addWorksheet(company.data.symbol, {
    views: [
      { state: 'frozen', xSplit: 5, ySplit: 5 },
      { showGridLines: false },
    ],
  });
  // format cell
  sheet.columns = [
    {
      width: 5.5,
    },
    {
      key: 'id',
      width: 2.5,
    },
  ];
  // Company Name
  sheet.mergeCells('A1:E1');

  const name = sheet.getCell('A1');
  name.value = company.data.name;
  name.font = {
    name: 'Arial',
    size: 12,
    bold: true,
  };
  // description of the financial information (italic size=9)
  const description = sheet.getCell('C3');
  description.value = `Financials (all figures in ${`${company.data.reportedCurrency || 'USD$'} `} Millions except per share data)`;
  description.font = {
    name: 'Arial',
    size: 9,
    italic: true,
    color: { argb: '000000FF' },
  };

  // border between categories
  let length = 5;
  data.categories.forEach((category) => {
    if (data.column === 'year' && category.hidden) return;
    sheet.mergeCells(4, length + 1, 4, length + category.values.length);

    const cell = sheet.getCell(4, length + 1);
    cell.value = category.tableName || category.name;
    cell.font = {
      name: 'Arial',
      size: 10,
      bold: true,
      color: { argb: '000000FF' },
    };
    cell.alignment = { horizontal: 'center' };
    cell.border = {
      bottom: {
        style: 'thin',
        color: { argb: '009B9B9B' },
      },
    };

    length += category.values.length;
  });

  const fiscal = sheet.getCell('C5');
  fiscal.value = data.columnName;
  fiscal.font = {
    name: 'Arial',
    size: 10,
    color: { argb: '000000FF' },
    bold: true,
  };

  for (let i = 3; i < length + 1; i += 1) {
    const cell = sheet.getCell(3, i);
    cell.border = {
      bottom: {
        style: 'medium',
        color: { argb: '' },
      },
    };
  }

  length = 6;
  data.categories.forEach((category) => {
    if (data.column === 'year' && category.hidden) return;
    let { column } = data;

    if (category.name !== 'Quarterly') {
      column = 'year';
    }
    category.values.forEach((value) => {
      const cell = sheet.getCell(5, length);

      cell.value = value[column];
      cell.font = {
        name: 'Arial',
        size: 10,
      };
      cell.alignment = { horizontal: 'center' };

      length += 1;
    });
  });

  length = 7;
  data.rows.forEach((row, index) => {
    /*
      hide rows of
      {
        enterpriseValue,
        netDebtEstimate,
        requiredReturn,
        terminalValue,
        preferredStock,
        minorityInterest,
        freeCashFlowGrowthRate
      } for MarketCap
    */
    if (row.hidden) sheet.getRow(length).hidden = true;

    // calculate the formula
    const counter = sheet.getCell(length, 2);
    counter.value = index + 1;
    counter.font = {
      name: 'Arial',
      size: 7,
      color: { argb: '00808080' },
    };

    const rowName = sheet.getCell(length, 3);
    rowName.value = row.name;
    rowName.font = {
      name: 'Arial',
      size: 10,
    };

    let innerLength = 6;
    data.categories.forEach((category) => {
      if (data.column === 'year' && category.hidden) return;

      category.values.forEach((value) => {
        let { column } = data;

        if (category.name !== 'Quarterly') {
          column = 'year';
        }
        const cell = sheet.getCell(length, innerLength);
        if (category.name === 'Actual' && data.column === 'quarterlyPeriod') {
          sheet.getColumn(innerLength).width = 0;
        }
        const formula = convertFormulas(value[row.key], value, data, column);
        const isFormula = typeof formula === 'string' && formula.startsWith('=');

        cell.value = isFormula ? { formula } : (formula || 0);
        cell.name = getColumnName(row.key, value[column]);

        cell.font = {
          name: 'Arial',
          size: 8,
        };

        if (row.handler === percentage) {
          cell.numFmt = '0.0 "%";"("0.0") %";"-"';
        } else if (row.handler === dollars && company.data.currency === 'USD') {
          cell.numFmt = '"$" #,##0,,;"$ ("#,##0,,")";"-"';
        } else if (row.handler === dollars && company.data.currency !== 'USD') {
          cell.numFmt = '#,##0,,;"("#,##0,,")";"-"';
        } else if (row.handler === money) {
          cell.numFmt = '#,##0,,;"("#,##0,,")";"-"';
        } else if (row.handler === ratio) {
          cell.numFmt = '0.0;"("0.0")";"-"';
        } else {
          cell.numFmt = '#,##;"("#,##")";"-"';
        }

        if (category.editable && row.editable) {
          cell.font.color = { argb: '000000FF' };
        }

        innerLength += 1;
      });
    });

    length += row.separate ? 2 : 1;
  });

  // company.ceo.forEach((ceo) => {

  // });

  const buffer = await workbook.xlsx.writeBuffer();

  const elem = window.document.createElement('a');
  elem.href = window.URL.createObjectURL(new Blob([buffer]));
  elem.download = 'export.xlsx';
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
};
