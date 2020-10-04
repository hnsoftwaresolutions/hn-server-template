'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'instances',
            function () {
                describe(
                    'index',
                    function () {
                        let expect;
                        let index;
                        let expressRateLimitInstanceStub;
                        let helmetInstanceStub;

                        before(function () {
                            expect = chai.expect;
                            chai.use(sinonChai);
                        });

                        beforeEach(function () {
                            helmetInstanceStub = sinon.stub()
                                .returns('helmetInstanceStub');
                            expressRateLimitInstanceStub = sinon.stub()
                                .returns('expressRateLimitInstanceStub');

                            index = proxyquire(
                                '../../../src/instances/index.js',
                                {
                                    './express-rate-limit-instance': expressRateLimitInstanceStub,
                                    './helmet-instance': helmetInstanceStub
                                }
                            );
                        });

                        afterEach(function () {
                            sinon.reset();
                            sinon.restore();
                        });

                        it(
                            'should export 2 file',
                            function () {
                                const EXPORTED_FILES_COUNT = 2;

                                expect(Object.keys(index).length)
                                    .to
                                    .be
                                    .equal(EXPORTED_FILES_COUNT);
                            }
                        );

                        it(
                            'should export correct file(s)',
                            function () {
                                expect(index.expressRateLimitInstance())
                                    .to
                                    .be
                                    .equal('expressRateLimitInstanceStub');

                                expect(index.helmetInstance())
                                    .to
                                    .be
                                    .equal('helmetInstanceStub');
                            }
                        );
                    }
                );
            }
        );
    }
);
