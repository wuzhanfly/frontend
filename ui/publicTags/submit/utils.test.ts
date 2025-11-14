import * as mocks from './mocks';
import { convertFormDataToRequestsBody, convertTagApiFieldsToFormFields, groupSubmitResult } from './utils';

const t = (key: string) => key;

describe('function convertFormDataToRequestsBody()', () => {
  it('should convert form data to requests body', () => {
    const formData = {
      ...mocks.baseFields,
      addresses: [ { hash: mocks.address1 }, { hash: mocks.address2 } ],
      tags: [ convertTagApiFieldsToFormFields(mocks.tag1), convertTagApiFieldsToFormFields(mocks.tag2) ],
    };
    const result = convertFormDataToRequestsBody(formData);
    expect(result).toMatchObject([
      { address: mocks.address1, name: mocks.tag1.name, tagType: mocks.tag1.tagType },
      { address: mocks.address1, name: mocks.tag2.name, tagType: mocks.tag2.tagType },
      { address: mocks.address2, name: mocks.tag1.name, tagType: mocks.tag1.tagType },
      { address: mocks.address2, name: mocks.tag2.name, tagType: mocks.tag2.tagType },
    ]);
  });
});

describe('function groupSubmitResult()', () => {
  it(t('common.common.group_success_result'), () => {
    const result = groupSubmitResult(mocks.allSuccessResponses);
    expect(result).toMatchObject({
      requesterName: mocks.baseFields.requesterName,
      requesterEmail: mocks.baseFields.requesterEmail,
      companyName: mocks.baseFields.companyName,
      companyWebsite: mocks.baseFields.companyWebsite,
      items: [
        {
          error: null,
          addresses: [ mocks.address1, mocks.address2, mocks.address3, mocks.address4, mocks.address5 ],
          tags: [ mocks.tag1, mocks.tag2, mocks.tag3 ],
        },
      ],
    });
  });

  it(t('common.common.group_result_with_error'), () => {
    const result = groupSubmitResult(mocks.mixedResponses);
    expect(result).toMatchObject({
      requesterName: mocks.baseFields.requesterName,
      requesterEmail: mocks.baseFields.requesterEmail,
      companyName: mocks.baseFields.companyName,
      companyWebsite: mocks.baseFields.companyWebsite,
      items: [
        {
          error: null,
          addresses: [ mocks.address1 ],
          tags: [ mocks.tag1 ],
        },
        {
          error: null,
          addresses: [ mocks.address3 ],
          tags: [ mocks.tag3 ],
        },
        {
          error: t('common.common.some_error'),
          addresses: [ mocks.address1, mocks.address2 ],
          tags: [ mocks.tag2, mocks.tag3 ],
        },
        {
          error: t('common.common.some_error'),
          addresses: [ mocks.address3 ],
          tags: [ mocks.tag1 ],
        },
        {
          error: t('common.common.another_nasty_error'),
          addresses: [ mocks.address3 ],
          tags: [ mocks.tag2 ],
        },
      ],
    });
  });
});
