'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'controllers',
            function () {
                describe(
                    'error',
                    function () {
                        describe(
                            'not-found',
                            function () {
                                let expect;
                                let sendStatusSpy;
                                let notFound;

                                before(function () {
                                    expect = chai.expect;
                                    chai.use(sinonChai);
                                });

                                beforeEach(function () {
                                    sendStatusSpy = sinon.spy();

                                    notFound = proxyquire(
                                        '../../../../../src/controllers/error/not-found',
                                        {
                                            'http-status-codes': {
                                                StatusCodes: {
                                                    NOT_FOUND: 'NOT_FOUND'
                                                }
                                            }
                                        }
                                    );
                                });

                                afterEach(function () {
                                    sinon.reset();
                                    sinon.restore();
                                });

                                it(
                                    'should call res.sendStatus with httpStatusCodes.StatusCodes.NOT_FOUND',
                                    function () {
                                        notFound(
                                            null,
                                            {
                                                sendStatus: sendStatusSpy
                                            }
                                        );

                                        expect(sendStatusSpy)
                                            .to
                                            .be
                                            .calledOnceWithExactly('NOT_FOUND');
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);
