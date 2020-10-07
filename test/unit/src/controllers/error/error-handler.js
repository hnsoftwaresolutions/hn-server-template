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
                                let nextSpy;
                                let sendStatusSpy;
                                let errorHandler;

                                before(function () {
                                    expect = chai.expect;
                                    chai.use(sinonChai);
                                });

                                beforeEach(function () {
                                    nextSpy = sinon.spy();
                                    sendStatusSpy = sinon.spy();

                                    errorHandler = proxyquire(
                                        '../../../../../src/controllers/error/error-handler',
                                        {
                                            'http-status-codes': {
                                                StatusCodes: {
                                                    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
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
                                    'should call next function with error if headersSent is true',
                                    function () {
                                        errorHandler(
                                            'error',
                                            null,
                                            {
                                                sendStatus: sendStatusSpy,
                                                headersSent: true
                                            },
                                            nextSpy
                                        );

                                        expect(nextSpy)
                                            .to
                                            .be
                                            .calledOnceWithExactly('error');
                                    }
                                );

                                it(
                                    'should not call sendStatus if headersSent is true',
                                    function () {
                                        errorHandler(
                                            null,
                                            null,
                                            {
                                                sendStatus: sendStatusSpy,
                                                headersSent: true
                                            },
                                            nextSpy
                                        );

                                        expect(sendStatusSpy)
                                            .not
                                            .to
                                            .be
                                            .called;
                                    }
                                );

                                it(
                                    'should not call next function with error if headersSent is false',
                                    function () {
                                        errorHandler(
                                            null,
                                            null,
                                            {
                                                sendStatus: sendStatusSpy,
                                                headersSent: false
                                            },
                                            nextSpy
                                        );

                                        expect(nextSpy)
                                            .not
                                            .to
                                            .be
                                            .called;
                                    }
                                );

                                it(
                                    'should call res.sendStatus with '
                                    + 'httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR '
                                    + 'if headersSent is false',
                                    function () {
                                        errorHandler(
                                            null,
                                            null,
                                            {
                                                sendStatus: sendStatusSpy,
                                                headersSent: false
                                            },
                                            nextSpy
                                        );

                                        expect(sendStatusSpy)
                                            .to
                                            .be
                                            .calledOnceWithExactly('INTERNAL_SERVER_ERROR');
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
