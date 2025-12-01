// export default { extends: ['@commitlint/config-conventional'] };

const { parser } = require('typescript-eslint');

module.exports = {
  //Buoc phai ke thua lai cac rule co ban tu bo quy tac conventional commitlint
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      //regex parer de trich xuat type, scope, subject
      headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
      //cac group tuong ung voi regex o tren
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    //chi cho phep type thuoc danh sach sau
    //feat : them chuc nang moi, fix = sua bug, docs = tai lieu
    //style = format code, refactor = cai tien code, test = them test, chore = cong viec
    //revert = rollback comit
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test'],
    ],
    //mo ta commit khong duoc de trong
    'subject-empty': [2, 'never'],
    //khong cho phep viet hoa chu cai dau tien trong mo ta commit
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
  },
};
