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
                        let helmetInstanceStub;

                        before(function () {
                            expect = chai.expect;
                            chai.use(sinonChai);
                        });

                        beforeEach(function () {
                            helmetInstanceStub = sinon.stub()
                                .returns('helmetInstanceStub');

                            index = proxyquire(
                                '../../../src/instances/index.js',
                                {
                                    './helmet-instance': helmetInstanceStub
                                }
                            );
                        });

                        afterEach(function () {
                            sinon.reset();
                            sinon.restore();
                        });

                        it(
                            'should export 1 file',
                            function () {
                                const EXPORTED_FILES_COUNT = 1;

                                expect(Object.keys(index).length)
                                    .to
                                    .be
                                    .equal(EXPORTED_FILES_COUNT);
                            }
                        );

                        it(
                            'should export correct file(s)',
                            function () {
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
