'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'app',
            function () {
                let app;
                let expect;
                let expressStub;
                let expressUseSpy;

                before(function () {
                    expect = chai.expect;
                    chai.use(sinonChai);
                });

                beforeEach(function () {
                    expressUseSpy = sinon.stub();
                    expressStub = sinon.stub()
                        .returns({
                            name: 'expressStub',
                            use: expressUseSpy
                        });

                    app = proxyquire(
                        '../../../src/app.js',
                        {
                            express: expressStub,
                            './instances': {
                                helmetInstance: 'helmetInstance',
                                expressRateLimitInstance: 'expressRateLimitInstance'
                            },
                            './controllers': {
                                errorController: {
                                    errorHandler: 'errorHandler',
                                    notFound: 'notFound'
                                }
                            }
                        }
                    );
                });

                afterEach(function () {
                    sinon.restore();
                    sinon.reset();
                });

                it(
                    'should call express once with no parameters',
                    function () {
                        expect(expressStub)
                            .to
                            .have
                            .been
                            .calledOnceWithExactly();
                    }
                );

                it(
                    'should call express.use with helmet instance',
                    function () {
                        expect(expressUseSpy)
                            .to
                            .have
                            .been
                            .calledWithExactly('helmetInstance');
                    }
                );

                it(
                    'should call express.use with express rate limit instance',
                    function () {
                        expect(expressUseSpy)
                            .to
                            .have
                            .been
                            .calledWithExactly('expressRateLimitInstance');
                    }
                );

                it(
                    'should call express.use with not found error controller function',
                    function () {
                        expect(expressUseSpy)
                            .to
                            .have
                            .been
                            .calledWithExactly('notFound');
                    }
                );

                it(
                    'should call express.use with error handler error controller function',
                    function () {
                        expect(expressUseSpy)
                            .to
                            .have
                            .been
                            .calledWithExactly('errorHandler');
                    }
                );

                it(
                    'should call express.use four times',
                    function () {
                        const CALL_COUNT = 4;

                        expect(expressUseSpy.callCount)
                            .to
                            .be
                            .equal(CALL_COUNT);
                    }
                );

                it(
                    'should export correct data',
                    function () {
                        expect(app.name)
                            .to
                            .be
                            .equal('expressStub');
                    }
                );
            }
        );
    }
);
