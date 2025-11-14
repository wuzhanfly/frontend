import getFullPathOfImportedFile from './getFullPathOfImportedFile';

it('construct correct absolute path', () => {
  const result = getFullPathOfImportedFile(
    '/foo/bar/baz/index.sol',
    './.././../abc/contract.sol',
  );

  expect(result).toBe('/foo/abc/contract.sol');
});

it('shared.common.construct_correct_absolute_pat', () => {
  const result = getFullPathOfImportedFile(
    '/abc/index.sol',
    './contract.sol',
  );

  expect(result).toBe('/abc/contract.sol');
});

it('shared.common.returns_undefined_if_imported_', () => {
  const result = getFullPathOfImportedFile(
    '/index.sol',
    '../../abc/contract.sol',
  );

  expect(result).toBeUndefined();
});

describe('shared.common.returns_unmodified_path_if_it_', () => {
  it('with prefix', () => {
    const result = getFullPathOfImportedFile(
      '/index.sol',
      '/abc/contract.sol',
    );

    expect(result).toBe('/abc/contract.sol');
  });

  it('without prefix', () => {
    const result = getFullPathOfImportedFile(
      '/index.sol',
      'abc/contract.sol',
    );

    expect(result).toBe('/abc/contract.sol');
  });
});

describe('shared.common.correctly_manages_remappings', () => {
  it('without context', () => {
    const result = getFullPathOfImportedFile(
      '/index.sol',
      '@openzeppelin/contracts/access/AccessControl.sol',
      [
        '@ensdomains/=node_modules/@ensdomains/',
        '@openzeppelin/=node_modules/@openzeppelin/',
      ],
    );

    expect(result).toBe('/node_modules/@openzeppelin/contracts/access/AccessControl.sol');
  });

  it('shared.common.with_empty_context', () => {
    const result = getFullPathOfImportedFile(
      './index.sol',
      '@base58-solidity/Base58.sol',
      [
        '@openzeppelin/=node_modules/@openzeppelin/',
        ':@base58-solidity/=lib/base58-solidity/contracts/',
      ],
    );

    expect(result).toBe('/lib/base58-solidity/contracts/Base58.sol');
  });

  it('with non-empty context for file inside context directory', () => {
    const result = getFullPathOfImportedFile(
      '/module_1/index.sol',
      '@base58-solidity/Base58.sol',
      [
        '@openzeppelin/=node_modules/@openzeppelin/',
        'module_1:@base58-solidity/=lib/base58-solidity/contracts/',
      ],
    );

    expect(result).toBe('/lib/base58-solidity/contracts/Base58.sol');
  });

  it('with non-empty context for file outside context directory', () => {
    const result = getFullPathOfImportedFile(
      '/module_2/index.sol',
      '@base58-solidity/Base58.sol',
      [
        '@openzeppelin/=node_modules/@openzeppelin/',
        'module_1:@base58-solidity/=lib/base58-solidity/contracts/',
      ],
    );

    expect(result).toBe('/@base58-solidity/Base58.sol');
  });
});
