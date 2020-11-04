const childProcess = require('child_process');
const findLatestWidgetVersion = require('@okta/vuepress-site/.vuepress/scripts/findLatestWidgetVersion');

jest.mock('child_process');
childProcess.execSync.mockImplementation( () => JSON.stringify(['1.12.0','1.13.0']) );

describe('findLatestWidgetVersion', () => {   
  
  it('finds the latest for a given major version', () => { 
    expect(findLatestWidgetVersion(1)).toBe('1.13.0'); // dead version, shouldn't change
  });

  it('handles string input for major version', () => {
    expect(findLatestWidgetVersion('1')).toBe('1.13.0'); // dead version, shouldn't change
  });

  it('blows up if the version is not a version', () => {
    expect(() => findLatestWidgetVersion('hello') ).toThrow('only digits for a major version of the widget permitted! saw: "hello"');
  });

  it('blows up if the version is too specific', () => {
    expect(() => findLatestWidgetVersion('1.13') ).toThrow('only digits for a major version of the widget permitted! saw: "1.13"'); 
    expect(() => findLatestWidgetVersion('1.13.0') ).toThrow('only digits for a major version of the widget permitted! saw: "1.13.0"'); 
  });

  it('handles single available published version', () => {
    childProcess.execSync.mockImplementation(() => JSON.stringify('1.13.0'));
    expect(findLatestWidgetVersion('1')).toBe('1.13.0'); // dead version, shouldn't change
  })
});
